using System;
using Core.Entities;
using Core.Interfaces;
using Microsoft.Extensions.Configuration;
using Stripe;

namespace Infrastructure.Services;

public class CouponService : ICouponService
{
    public CouponService(IConfiguration config)
    {
        StripeConfiguration.ApiKey = config["StripeSettings:SecretKey"];
    }
    public async Task<AppCoupon?> GetCouponFromPromoCode(string code)
    {
        var stripeCodeService = new PromotionCodeService();
        var options = new PromotionCodeListOptions
        {
            Code = code
        };
        var promotionCode = await stripeCodeService.ListAsync(options);
        var promoCode = promotionCode.FirstOrDefault();
        if (promoCode != null && promoCode.Coupon != null)
        {
            return new AppCoupon
            {
                Name = promoCode.Coupon.Name,
                AmountOff = promoCode.Coupon.AmountOff,
                PercentOff = promoCode.Coupon.PercentOff,
                PromotionalCode = promoCode.Code,
                CouponId = promoCode.Coupon.Id
            };
        }
        return null;
    }
}
