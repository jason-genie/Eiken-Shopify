var xxx;
NProgress.start(),
    jQuery(window).resize(function () {
        768 > roar.getWidthBrowser() && $("#popup-mailchimp.hidden-xs").find(".mfp-close").trigger("click");
    }),
    jQuery(document).ready(function () {
        try {
            roar.initLazyLoading(), roar.init(), roarLookbook.init(), theme.CurrencyPicker.init(), theme.LanguagePicker.init();
        } finally {
            NProgress.done();
        }
    }),
    jQuery(window).load(function () {
        roar.initLazyLoading(),
            setTimeout(function () {
                roar.handleSeasonalFrame();
            }, 3e3);
    });
var roar = {
        init: function () {
            this.handleAccount(),
                this.handleCartAgree(),
                this.handleAddress(),
                this.initProductQuickShopItem(),
                this.initFilterSidebar(),
                this.initFooterCollapse(),
                this.initVerticalMenuSidebar(),
                this.initChangeInputNameCartPage(),
                this.handleOrder(),
                this.initCountdown(),
                this.addToCart(),
                this.cartSidebar(),
                this.removeCart(),
                this.addToWishlist(),
                this.handleCompare(),
                this.removeToWishlist(),
                this.handlePopups(),
                this.handleSearch(),
                this.handleGMap(),
                this.handleScrollToTop(),
                this.handleSmoothScroll(),
                this.mapFilters(),
                this.handleQuickshop(),
                this.handleBlog(),
                this.handleCookie(),
                this.fixedHeaderMenu(),
                this.searchAutoComplete(),
                this.handleDropdown(),
                this.toggleFilter(),
                this.handleHeaderNotice(),
                this.handleInstagramFloatBar();
        },
        handleSeasonalFrame: function () {
            jQuery(window)
                .resize(function () {
                    if (0 < $(".rt-seasonal-frames").length) {
                        var t = !1;
                        if ((0 == $(".rt-seasonal-frames").data("mobile") && 768 < roar.getWidthBrowser() && (t = !0), 1 == $(".rt-seasonal-frames").data("mobile") && (t = !0), 1 == t)) {
                            $(".rt-seasonal-frames").show();
                            for (var e = $(".rt-seasonal-frames"), i = e.data("ow"), a = e.data("oh"), n = 0; n < e.children().length; n++) {
                                var o,
                                    r,
                                    s,
                                    c,
                                    l = $(e.children()[n]),
                                    d = l.data("position"),
                                    u = l.data("idx"),
                                    h = l.data("w"),
                                    p = l.data("h"),
                                    f = l.data("x"),
                                    m = l.data("y"),
                                    g = l.data("src"),
                                    v = 1e3 + u;
                                "top" == d || "bottom" == d
                                    ? ((r = h * (o = window.innerWidth / i)),
                                      (_newHeight = p * o),
                                      (s = f * o),
                                      (c = "top" == d ? m * o : (a - m - p) * o),
                                      l.html(""),
                                      l.html('<img width="' + r + '" height="' + _newHeight + '" style="z-index:' + v + ";left:" + s + "px;" + d + ":" + c + 'px" src="' + g + '"/>'))
                                    : ((r = h * (o = window.innerHeight / a)),
                                      (_newHeight = p * o),
                                      (c = m * o),
                                      (s = "left" == d ? f * o : (i - f - h) * o),
                                      l.html(""),
                                      l.html('<img width="' + r + '" height="' + _newHeight + '" style="z-index:' + v + ";top:" + c + "px;" + d + ":" + s + 'px" src="' + g + '"/>'));
                            }
                        } else $(".rt-seasonal-frames").hide();
                    }
                })
                .resize();
        },
        handleCartAgree: function () {
            $("body").on("change", ".product-cart__agree", function () {
                var t = $(this),
                    e = $(this).closest(".cart__condition__wrapper").find(".checkout-button");
                t.is(":checked") ? e.removeClass("btn-disabled") : e.addClass("btn-disabled");
            });
        },
        handleAddress: function () {
            var t = $("#AddressNewForm");
            t.length &&
                (Shopify && new Shopify.CountryProvinceSelector("AddressCountryNew", "AddressProvinceNew", { hideElement: "AddressProvinceContainerNew" }),
                $(".address-country-option").each(function () {
                    var t = $(this).data("form-id");
                    new Shopify.CountryProvinceSelector("AddressCountry_" + t, "AddressProvince_" + t, { hideElement: "AddressProvinceContainer_" + t });
                }),
                $(".address-new-toggle").on("click", function () {
                    t.toggleClass("hide");
                }),
                $(".address-edit-toggle").on("click", function () {
                    var t = $(this).data("form-id");
                    $("#EditAddress_" + t).toggleClass("hide");
                }),
                $(".address-delete").on("click", function () {
                    var t = $(this),
                        e = t.data("form-id"),
                        i = t.data("confirm-message");
                    confirm(i || "Are you sure you wish to delete this address?") && Shopify.postLink("/account/addresses/" + e, { parameters: { _method: "delete" } });
                }));
        },
        handleAccount: function () {
            function t() {
                return $("#recover-password").fadeIn(), $("#customer-login").hide(), (window.location.hash = "#recover"), !1;
            }
            function e() {
                return $("#recover-password").hide(), $("#customer-login").fadeIn(), (window.location.hash = ""), !1;
            }
            $("#forgot_password a").click(function () {
                t();
            }),
                "#recover" == window.location.hash ? t() : e(),
                $("#recover-password .cancel").click(function () {
                    e();
                });
        },
        handleHeaderNotice: function () {
            if (window.hn_use) {
                var t = !0;
                window.hn_once && "yes" == localStorage.getItem("displayNotice") && (t = !1),
                    1 == t &&
                        ($("#header-notice .header-notice").children().show(),
                        $("#header-notice .close-notice").on("click", function () {
                            return window.hn_once && localStorage.setItem("displayNotice", "yes"), $("#header-notice .header-notice").children().hide(), !1;
                        }));
            }
        },
        handleInstagramFloatBar: function () {
            window.social_instagram &&
                new Instafeed({
                    get: "user",
                    target: "instagram_list",
                    accessToken: $("#instagram_list").data("token"),
                    userId: $("#instagram_list").data("uid"),
                    limit: $("#instagram_list").data("limit"),
                    resolution: "thumbnail",
                    resolution2: "standard_resolution",
                    template: '<a target="_blank" href="{{link}}"><img src="{{image}}" alt="{{caption}}" width="150" height="150" /></a>',
                }).run();
        },
        initLazyLoading: function (t, e) {
            (t = t || "body"), (e = e || !1);
            var i = new Blazy({
                selector: t + " .b-lazy",
                success: function (t) {
                    setTimeout(function () {
                        var e = t.parentNode;
                        e.className = e.className.replace(/\bb-loading\b/, "");
                    }, 200);
                },
            });
            1 == e && i.load($(t + " .b-lazy"), !0);
        },
        initProductQuickShopItem: function (t) {
            function e(t) {
                return (t + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
            }
            function a(t) {
                return t
                    .toLowerCase()
                    .replace(/[^a-z0-9 -]/g, "")
                    .replace(/\s+/g, "-")
                    .replace(/-+/g, "-");
            }
            function n(t) {
                var e = t.replace("https:", "").replace("http:", "").split("?v=")[0].split("/"),
                    i = e[e.length - 1].split("."),
                    a = i.pop(),
                    n = i.join(".") + "_100x." + a;
                return t.replace(e[e.length - 1], n);
            }
            function o(t, e) {
                var i = t.replace("https:", "").replace("http:", "").split("?v=")[0].split("/"),
                    a = i[i.length - 1].split("."),
                    n = a.pop(),
                    o = a.join(".") + e + "@2x." + n,
                    r = a.join(".") + e + "." + n,
                    s = {};
                return (s.srcset = t.replace(i[i.length - 1], o) + " 500w," + t.replace(i[i.length - 1], r) + " 166w"), (s.src = t.replace(i[i.length - 1], r)), s;
            }
            function r(t, e) {
                if (
                    (e.available
                        ? (t.find("div.price").data("price", e.price), t.find(".btn-action.addtocart-item-js span").text(theme.strings.addToCart), t.find(".btn-action.addtocart-item-js").prop("disabled", !1))
                        : (t.find("div.price").data("price", "0"), t.find(".btn-action.addtocart-item-js span").text(theme.strings.soldOut), t.find(".btn-action.addtocart-item-js").prop("disabled", !0)),
                    0 < t.closest(".grouped-product").length && roar.updateGroupedPrice(),
                    t.find("select.variation-select.no-js").val(e.id),
                    t.find("span.price-new.money").html(theme.Currency.formatMoney(e.price, theme.settings.moneyFormat)),
                    e.compare_at_price > e.price)
                ) {
                    if (
                        (t.find("span.price-old.money").html(theme.Currency.formatMoney(e.compare_at_price, theme.settings.moneyFormat)).removeClass("hide"),
                        t.find(".sale").text(theme.strings.sale).removeClass("hide"),
                        t.find(".sale").hasClass("percentage"))
                    ) {
                        var i = Math.round((100 * (e.compare_at_price - e.price)) / e.compare_at_price);
                        t.find(".sale").text("-" + i + "%");
                    }
                } else t.find("span.price-old.money").addClass("hide"), t.find(".sale").addClass("hide");
                if (
                    (window.show_multiple_currencies &&
                        ((function (t) {
                            var e,
                                i = t,
                                a = [],
                                n = i.get(0).attributes,
                                o = n.length;
                            for (e = 0; e < o; e++) "data-" === n[e].name.substring(0, 5) && a.push(n[e].name);
                            $.each(a, function (t, e) {
                                i.removeAttr(e);
                            });
                        })(t.find(".money")),
                        theme.CurrencyPicker.convert(".product-item-advanced-wrapper .money")),
                    null !== e.featured_image)
                ) {
                    !(function (t, e) {
                        var i = e.replace("https:", "").replace("http:", "").split("?v=")[0],
                            a = "";
                        0 < t.find(".item-images-wrapper a").length &&
                            t.find(".item-images-wrapper a").each(function () {
                                $(this).data("_image").replace("https:", "").replace("http:", "").split("?v=")[0] != i || (a = $(this));
                            }),
                            t.find(".item-images-wrapper a").removeClass("active"),
                            "" != a && a.addClass("active");
                    })(t, e.featured_image.src);
                    var a = o(e.featured_image.src, t.data("_dim"));
                    t.find("img.mpt-image").attr("srcset", a.srcset).attr("src", a.src);
                }
            }
            t = t || "body";
            var s = $(t).find(".single-option-selector-item");
            0 < s.length &&
                s.unbind("change") &&
                s.on("change", function () {
                    var t = $(this).closest(".product-item-advanced-wrapper");
                    if (0 < $(t.find(".product-item-option").data("id")).length) {
                        var e = JSON.parse($(t.find(".product-item-option").data("id")).html()),
                            i = {},
                            a = "not_found";
                        for (
                            $(this)
                                .closest(".variations-content")
                                .find(".single-option-selector-item")
                                .each(function () {
                                    i[$(this).data("index")] = $(this).val();
                                }),
                                k = 0;
                            k < e.variants.length;
                            k++
                        ) {
                            var n = !1;
                            for (ol = 1; ol <= e.options.length; ol++) {
                                if (i["option" + ol] != e.variants[k]["option" + ol]) {
                                    n = !1;
                                    break;
                                }
                                n = !0;
                            }
                            if (1 == n) {
                                (a = "found"), r(t, e.variants[k]);
                                break;
                            }
                        }
                        "not_found" == a && (t.find(".btn-action.addtocart-item-js span").text(theme.strings.unavailable), t.closest(".product-item-advanced-wrapper").find(".btn-action.addtocart-item-js").prop("disabled", !0));
                    }
                });
            var c = $(t).find(".product-item-option");
            if (0 < c.length) {
                var l = 0,
                    d = {};
                c.each(function () {
                    if (!$(this).hasClass("has-swatch-finished")) {
                        ++l;
                        var t = $(this)
                            .closest(".product-item-advanced-wrapper")
                            .addClass("product-item-advanced-wrapper-" + l);
                        if (
                            ($(this)
                                .find(".single-option-selector-item")
                                .each(function () {
                                    var t = $(this).data("id") + "-" + l;
                                    $(this).attr("id", t), $(this).data("_index", l);
                                }),
                            0 < $($(this).data("id")).length)
                        ) {
                            var o = JSON.parse($($(this).data("id")).html());
                            0 < $($(this).data("swatch_id")).length && (d = JSON.parse($($(this).data("swatch_id")).html()));
                            var r = [];
                            if (("1" == window.swatch_size && r.push("Size"), r.push("size"), "1" == window.swatch_color && (r.push("Color"), r.push("Colour"), r.push("color"), r.push("colour")), 0 < r.length)) {
                                var s = !1,
                                    c = 0,
                                    u = theme.asset_url.substring(0, theme.asset_url.lastIndexOf("?")),
                                    h = theme.asset_url.substring(theme.asset_url.lastIndexOf("?"), theme.asset_url.length);
                                for (i = 0; i < o.options.length; i++) {
                                    var p = "",
                                        f = "",
                                        m = "",
                                        g = "",
                                        v = "",
                                        _ = "",
                                        w = "",
                                        y = "img btooltip";
                                    if (((p = "object" == typeof o.options[i] ? o.options[i].name : o.options[i]), (s = !1), !1, -1 < r.indexOf(p))) {
                                        (s = !0), (c = i);
                                        var b = p.toLowerCase();
                                        if ((/color|colour/i.test(b) && !0, s)) {
                                            var k = [];
                                            for (j = 0; j < o.variants.length; j++) {
                                                var C = o.variants[j],
                                                    S = e(C.options[c]),
                                                    x = a(S);
                                                0 > k.indexOf(S) &&
                                                    ("color" != b && "colour" != b
                                                        ? ((w = S), (y = "btooltip"))
                                                        : "1" == window.swatch_color_advanced
                                                        ? null !== d[x] && void 0 !== d[x] && "" != d[x]
                                                            ? ((y = "img btooltip swatch_color_advanced"), (w = '<i style="background-image: url(' + u + d[x] + ".png" + h + ')"></i>'))
                                                            : null === C.featured_image
                                                            ? (w = '<i style="background-color:' + S + "; background-image: url(" + u + x + ".png" + h + ')"></i>')
                                                            : ((y = "img btooltip swatch_color_advanced"), (w = '<i style="background-image: url(' + n(C.featured_image.src) + ')"></i>'))
                                                        : (w = '<i style="background-color:' + S + "; background-image: url(" + u + x + ".png" + h + ')"></i>'),
                                                    (_ = $("#single-option-selector-" + o.id + "-" + c + "-" + l).val() == S ? "selected " : ""),
                                                    (m =
                                                        m +
                                                        '<div class="swatch-element ' +
                                                        b +
                                                        x +
                                                        ' available"><input data-id="#single-option-selector-' +
                                                        o.id +
                                                        "-" +
                                                        c +
                                                        "-" +
                                                        l +
                                                        '" data-value="' +
                                                        S +
                                                        '"  class="swatch-radio ' +
                                                        _ +
                                                        '" id="swatch-' +
                                                        c +
                                                        "-" +
                                                        x +
                                                        "-" +
                                                        l +
                                                        '" type="radio" data-swatch="' +
                                                        b +
                                                        '" data-poption="' +
                                                        c +
                                                        '" name="option-' +
                                                        c +
                                                        '" value="' +
                                                        S +
                                                        '"><label for="swatch-' +
                                                        c +
                                                        "-" +
                                                        x +
                                                        "-" +
                                                        l +
                                                        '" class="' +
                                                        y +
                                                        '" title="' +
                                                        S +
                                                        '"><span class="soldout-image"></span>' +
                                                        w +
                                                        "</label></div>"),
                                                    k.push(S));
                                            }
                                            (f = '<div class="wrapper-swatches-product-item wrapper-swatches swatch ' + b + '" data-attribute_name="attribute_pa_' + b + '"><div>' + m + "</div></div>"),
                                                (g = t.find("#single-option-selector-" + o.id + "-" + c + "-" + l)),
                                                (v = t.find("#single-option-selector-" + o.id + "-" + c + "-" + l)),
                                                "" != f && (g.after(f), g.hide(), v.addClass("hide-choose-option"));
                                        }
                                    }
                                }
                            }
                            var T = "";
                            0 < t.find(".wrapper-swatches-product-item").length &&
                                ((T = t.find(".wrapper-swatches-product-item .swatch-radio")).unbind("click"),
                                T.on("click", function () {
                                    var t = $(this).closest(".product-item-advanced-wrapper").find($(this).data("id")),
                                        e = $(this).data("poption"),
                                        a = $(this).data("value");
                                    $(this).data("value") != t.val() && (t.val($(this).data("value")).trigger("change"), t.closest(".selector-wrapper").find(".swatch-radio").removeClass("selected"), $(this).addClass("selected")),
                                        (function (t, e, a, n) {
                                            if (1 < e.options.length)
                                                for (i = 0; i < e.options.length; i++)
                                                    i != a &&
                                                        $("#single-option-selector-" + e.id + "-" + i + "-" + t + " option").each(function () {
                                                            var o = $(this).closest(".product-item-advanced-wrapper"),
                                                                r = "unavailable",
                                                                s = $(this).attr("value");
                                                            for (j = 0; j < e.variants.length; j++) {
                                                                var c = e.variants[j];
                                                                if (c.options[a] == n && c.options[i] == s) {
                                                                    r = 1 == c.available ? "available" : "sold_out";
                                                                    break;
                                                                }
                                                            }
                                                            var l = o.find(
                                                                ".variations-content-" +
                                                                    e.id +
                                                                    " #swatch-" +
                                                                    i +
                                                                    "-" +
                                                                    s
                                                                        .toLowerCase()
                                                                        .replace(/[^a-z0-9 -]/g, "")
                                                                        .replace(/\s+/g, "-")
                                                                        .replace(/-+/g, "-") +
                                                                    "-" +
                                                                    t
                                                            );
                                                            $(l).closest(".swatch-element").removeClass("available").removeClass("sold_out").removeClass("unavailable").addClass(r);
                                                        });
                                            else
                                                for (i = 0; i < e.options.length; i++)
                                                    $("#single-option-selector-" + e.id + "-" + i + "-" + t + " option").each(function () {
                                                        var a = $(this).closest(".product-item-advanced-wrapper"),
                                                            n = "unavailable",
                                                            o = $(this).attr("value");
                                                        for (j = 0; j < e.variants.length; j++)
                                                            if (e.variants[j].options[i] == o) {
                                                                n = e.variants[j].available ? "available" : "sold_out";
                                                                break;
                                                            }
                                                        var r = a.find(
                                                            ".variations-content-" +
                                                                e.id +
                                                                " #swatch-" +
                                                                i +
                                                                "-" +
                                                                o
                                                                    .toLowerCase()
                                                                    .replace(/[^a-z0-9 -]/g, "")
                                                                    .replace(/\s+/g, "-")
                                                                    .replace(/-+/g, "-") +
                                                                "-" +
                                                                t
                                                        );
                                                        $(r).closest(".swatch-element").removeClass("available").removeClass("sold_out").removeClass("unavailable").addClass(n);
                                                    });
                                        })(t.data("_index"), o, e, a);
                                })),
                                $(".swatch-radio.selected").trigger("click");
                        }
                        $(this).addClass("has-swatch-finished");
                    }
                });
            }
            $(document).on("mouseenter mouseleave click", ".product-item-advanced-wrapper:not(.ag-column-content.col-sm-3 .product-item-advanced-wrapper):not(.ag-column-content.col-sm-4 .product-item-advanced-wrapper)", function (t) {
                var e = $(this),
                    i = window.innerWidth,
                    a = e.find(".product-item-content"),
                    n = e.find(".product-item-inside-hover"),
                    o = parseInt(n.height()) + parseInt(n.css("marginTop")) + 3,
                    r = e.find(".count_holder_item .is-countdown"),
                    s = (e.find(".count_holder_item .is-countdown").innerHeight(), e.find(".item-images-wrapper"));
                e.find(".item-images-wrapper").innerHeight(),
                    t.target,
                    "mouseenter" === t.type && 1024 < i
                        ? (e.css({ height: "100%" }).addClass("hovered"),
                          a.css("transform", "translateY(-" + o + "px)"),
                          n.css("opacity", "1"),
                          r.css("transform", "translateY(-" + parseInt(o + 10) + "px)"),
                          s.css("transform", "translateY(-" + parseInt(o) + "px)"))
                        : "mouseleave" === t.type && t.relatedTarget && 1024 < i && (e.removeClass("hovered").removeAttr("style"), a.removeAttr("style"), n.removeAttr("style"), r.removeAttr("style"), s.removeAttr("style"));
            }),
                0 < $(".item-images-wrapper").length &&
                    $(".item-images-wrapper a").on("click", function () {
                        if (!$(this).hasClass("active")) {
                            var t = o($(this).data("_image"), $(this).data("_dim"));
                            $(this).closest(".item-images-wrapper").find("a").removeClass("active"), $(this).addClass("active"), $(this).closest(".product-content-wrapper").find("img.mpt-image").attr("srcset", t.srcset).attr("src", t.src);
                        }
                    }),
                $(".items-image-buttons a").on("click", function (t) {
                    t.preventDefault(),
                        $(this).hasClass("next") ? $(this).closest(".product").find(".item-images-wrapper a.active").next().trigger("click") : $(this).closest(".product").find(".item-images-wrapper a.active").prev().trigger("click");
                });
        },
        initFilterSidebar: function () {
            $(".filter_title .arrow").click(function () {
                $(this).toggleClass("rotArr"), $(this).parent().next().slideToggle(300);
            });
        },
        initFooterCollapse: function () {
            $(".footer-accordion-heading").on("click", function (t) {
                t.preventDefault();
                var e = $(this).closest(".footer-accordion").find(".footer-accordion-content"),
                    i = $(this).find("i.fa");
                i.hasClass("aDown") ? i.removeClass("aDown") && e.slideUp() : i.addClass("aDown") && e.slideDown();
            });
        },
        initVerticalMenuSidebar: function () {
            $(".ver-dropdown-parent-submenu a.dropdown-link").on("click", function (t) {
                t.preventDefault();
                var e = $(this).closest(".ver-dropdown-parent-submenu").find("ul.ver-dropdown-menu"),
                    i = $(this).find("i.fa");
                i.hasClass("aDown") ? i.removeClass("aDown") && e.slideUp() : i.addClass("aDown") && e.slideDown();
            });
        },
        changeInputNameCartPage: function () {
            var t = "updates[]";
            767 < $(window).width() ? ($(".input-mobile").attr("name", ""), $(".input-desktop").attr("name", t)) : ($(".input-mobile").attr("name", t), $(".input-desktop").attr("name", ""));
        },
        initChangeInputNameCartPage: function () {
            $(".input-mobile").length &&
                $(".input-desktop").length &&
                (roar.changeInputNameCartPage(),
                $(window).resize(function () {
                    roar.changeInputNameCartPage();
                }));
        },
        fixedHeaderMenu: function () {
            if (!(991 >= $(window).width())) {
                if (
                    (0 < $("#header-phantom").length && $("#header-phantom").remove(),
                    0 < $(".section-megamenu-content").length &&
                        $(".section-megamenu-content").each(function () {
                            var t = $(this).data("menu_width_class");
                            0 < $(this).closest(".shopify-section").length && ($(this).closest(".shopify-section").hasClass(t) || $(this).closest(".shopify-section").addClass(t));
                        }),
                    "menu" == window.fixed_header)
                )
                    $('<div id="header-phantom" class="fixed-header-1 sticky-header"></div>').insertAfter(".megamenu-background"),
                        $(".megamenu-background").clone().appendTo("#header-phantom"),
                        roar.fixedMenu(),
                        $(window).resize(function () {
                            roar.fixedMenu();
                        }),
                        $(window).scroll(function () {
                            roar.fixedMenu();
                        });
                else if ("header" == window.fixed_header) {
                    $('<div id="header-phantom" class="fixed-header-1 sticky-header"></div>').insertAfter("#top"),
                        $("#top").clone().appendTo("#header-phantom"),
                        roar.fixedHeader(),
                        $(window).resize(function () {
                            roar.fixedHeader();
                        }),
                        $(window).scroll(function () {
                            roar.fixedHeader();
                        });
                }
                0 < $("#header-phantom .shopify-section").length &&
                    $("#header-phantom .shopify-section").each(function () {
                        $(this).removeClass("shopify-section");
                    });
            }
        },
        fixedHeader: function () {
            var t = $("header #top").first().width();
            $("header #top .background").first().width() != $("header").first().width() && $(".sticky-header").css("background", "none"),
                $(".sticky-header")
                    .css("width", t)
                    .css("left", "50%")
                    .css("right", "auto")
                    .css("margin-left", "-" + Math.ceil(t / 2) + "px")
                    .css("margin-right", "-" + Math.ceil(t / 2) + "px"),
                1160 <= roar.getWidthBrowser() && 280 < $(window).scrollTop() ? $(".sticky-header").addClass("fixed-header") : $(".sticky-header").removeClass("fixed-header");
        },
        fixedMenu: function () {
            var t = $("header .megamenu-background").first().width();
            $("header #top .background").first().width() != $("header").first().width() && $(".sticky-header").css("background", "none"),
                $(".sticky-header")
                    .css("width", t)
                    .css("left", "50%")
                    .css("right", "auto")
                    .css("margin-left", "-" + Math.ceil(t / 2) + "px")
                    .css("margin-right", "-" + Math.ceil(t / 2) + "px"),
                1160 <= roar.getWidthBrowser() && 280 < $(window).scrollTop() ? $(".sticky-header").addClass("fixed-header") : $(".sticky-header").removeClass("fixed-header");
        },
        toggleFilter: function () {
            $("#filter-sidebar").on("click", function () {
                $("body").toggleClass("open_filter");
            }),
                $(document).on("click", ".open_filter .spinner", function () {
                    $("body").removeClass("open_filter");
                }),
                $("#filter-addtocart").on("click", function () {
                    $("#product .add-to-cart").trigger("click");
                });
        },
        searchAutoComplete: function () {
            var t = null;
            $('form[action="/search"]').each(function () {
                var e = "product",
                    i = $(this).find('select[name="category_id"]'),
                    a = $(this).find('input[name="type"]');
                0 < i.length &&
                    0 < a.length &&
                    $(i).bind("change", function () {
                        $(a).val($(this).val()), (e = $(this).val());
                    });
                var n = $(this).find('input[name="q"]');
                $('<ul class="ui-autocomplete ui-front"></ul>').appendTo($(this).find(".autocomplete-results")).hide(),
                    n.attr("autocomplete", "off").bind("keyup change", function () {
                        var i = $(this).val(),
                            a = $(this).closest("form"),
                            o = "/search?type=" + e + "&q=*" + i + "*",
                            r = a.find(".ui-autocomplete");
                        3 <= i.length &&
                            i != $(this).attr("data-old-term") &&
                            (n.addClass("ui-autocomplete-loading"),
                            $(this).attr("data-old-term", i),
                            null != t && t.abort(),
                            (t = $.getJSON(o + "&view=json", function (t) {
                                n.removeClass("ui-autocomplete-loading"),
                                    r.empty(),
                                    0 == t.results_count
                                        ? r.hide()
                                        : ($.each(t.results, function (t, e) {
                                              var i = $("<a></a>").attr("href", e.url);
                                              i.append('<span class="thumbnail"><img src="' + e.thumbnail + '" /></span>'), i.append('<span class="title">' + e.title + "</span>"), i.wrap("<li></li>"), r.append(i.parent());
                                          }),
                                          1 < t.results_count && r.append('<li><span class="title"><a href="' + o + '">' + window.all_results_text + " (" + t.results_count + ")</a></span></li>"),
                                          r.fadeIn(200));
                            })));
                    });
            }),
                $("body").bind("click", function () {
                    $(".ui-autocomplete").hide();
                });
        },
        destroyCountdown: function () {
            $.fn.countdown && $(".is-countdown").countdown("destroy");
        },
        initCountdown: function () {
            $.fn.countdown &&
                $(".countdown:not(.is-countdown)").each(function () {
                    var t = $(this),
                        e = new Date(),
                        i = new Date(parseInt(t.data("year")), parseInt(t.data("month")) - 1, t.data("day"));
                    i > e ? t.countdown({ until: i }) : t.parent().hide();
                });
        },
        handleCookie: function () {
            !(function () {
                try {
                    var t = "popup-module-cookie";
                    if (0 < document.cookie.length) {
                        var e = document.cookie.indexOf(t + "=");
                        if (-1 != e) {
                            e = e + t.length + 1;
                            var i = document.cookie.indexOf(";", e);
                            return -1 == i && (i = document.cookie.length), unescape(document.cookie.substring(e, i));
                        }
                    }
                } catch (t) {
                    console.log(t.message);
                }
            })() &&
                $("#cookie").length &&
                ($("#cookie.cookie").length
                    ? $("#cookie").fadeIn("slow")
                    : $("#cookie.popup").length && $.magnificPopup.open({ items: { src: "#cookie", type: "inline" }, tLoading: "", mainClass: "popup-module mfp-with-zoom popup-type-2", removalDelay: 200, modal: !0 }),
                $("#cookie .accept").click(function () {
                    (function () {
                        try {
                            var t = "domain=." + document.domain,
                                e = new Date();
                            e.setTime(e.getTime() + 31536e6);
                            var i = "; expires=" + e.toGMTString();
                            document.cookie = "popup-module-cookie=true" + i + "; path=/; " + t;
                        } catch (t) {
                            console.log(t.message);
                        }
                    })(),
                        $("#cookie.cookie").length ? $("#cookie").fadeOut("slow") : $("#cookie.popup").length && $.magnificPopup.close();
                }));
        },
        handleBlog: function () {
            if ($("body").hasClass("templateBlog")) {
                var t = {};
                $(".posts").hasClass("posts-grid") &&
                    (t = $(".posts").masonry({ itemSelector: ".post" })).imagesLoaded().progress(function () {
                        t.masonry("layout");
                    }),
                    $("#load-more").click(function () {
                        var t = $(this).attr("data-page");
                        $.ajax({
                            url: location.href,
                            type: "get",
                            dataType: "html",
                            data: { page: t },
                            beforeSend: function () {
                                $("#load-more").button("loading");
                            },
                            complete: function () {
                                $("#load-more").button("reset");
                            },
                            success: function (e) {
                                return "" == e
                                    ? void $(".pagination-ajax").fadeOut()
                                    : ($(".posts").hasClass("posts-grid")
                                          ? ($(".posts").append($(e).find(".posts").html()),
                                            $(".posts").masonry("reloadItems").masonry({ sortBy: "original-order" }),
                                            setTimeout(function () {
                                                $(".posts").masonry("reloadItems").masonry({ sortBy: "original-order" });
                                            }, 500))
                                          : $(".posts").append($(e).find(".posts").html()),
                                      $("#load-more").attr("data-page", parseInt(++t)),
                                      void (function (t) {
                                          $.ajax({
                                              url: location.href,
                                              type: "get",
                                              dataType: "html",
                                              data: { page: t },
                                              success: function (t) {
                                                  "" != $(t).find(".blog-page .empty").html() && $(".pagination-ajax").hide();
                                              },
                                              error: function () {
                                                  $(".pagination-ajax").hide();
                                              },
                                          });
                                      })(t));
                            },
                        });
                    });
            }
        },
        handleCompare: function () {
            "1" == window.compare && (roar.handleCompareEvent(), roar.autoloadCompare(), roar.handleCompareScroll());
        },
        handleCompareEvent: function () {
            var t = $("body");
            $("a.add_to_compare");
            t.on("click", "a.add_to_compare", function () {
                var t = $(this).data("pid"),
                    e = "",
                    i = RoarCookie.cookie.rtread("rt-compare");
                if (0 > (i = null != i && "" != i ? i.split(",") : []).indexOf(t) && !1 === $(this).hasClass("added")) {
                    i.push(t);
                    var a = i.join(",");
                    "," == a.substring(0, 1) && (a = a.substring(1)), RoarCookie.cookie.rtwrite("rt-compare", a);
                }
                !1 === $(this).hasClass("added") || "" == e
                    ? ((e = ""),
                      $.ajax({
                          url: "/search?view=compare&q=" + i,
                          dataType: "html",
                          type: "GET",
                          success: function (t) {
                              e = t;
                          },
                          error: function () {
                              console.log("ajax error");
                          },
                          complete: function () {
                              $.magnificPopup.open({
                                  items: { src: e, type: "inline" },
                                  preloader: !0,
                                  tLoading: "",
                                  mainClass: "quickview compareview",
                                  removalDelay: 200,
                                  gallery: { enabled: !0 },
                                  callbacks: {
                                      open: function () {
                                          $('[data-pid="' + t + '"]')
                                              .addClass("added")
                                              .attr("title", $('[data-pid="' + t + '"]').attr("data-added")),
                                              $('[data-pid="' + t + '"]')
                                                  .find("span")
                                                  .html($('[data-pid="' + t + '"]').attr("data-add")),
                                              window.show_multiple_currencies && theme.CurrencyPicker.convert(".compare-content .money"),
                                              roar.handleReviews(),
                                              roar.handleCompareScroll();
                                      },
                                  },
                              });
                          },
                      }))
                    : $.ajax({
                          url: "/search?view=compare&q=" + i,
                          dataType: "html",
                          type: "GET",
                          success: function (t) {
                              e = t;
                          },
                          error: function () {
                              console.log("ajax error");
                          },
                          complete: function () {
                              $.magnificPopup.open({
                                  items: { src: e, type: "inline" },
                                  preloader: !0,
                                  tLoading: "",
                                  mainClass: "quickview compareview",
                                  removalDelay: 200,
                                  gallery: { enabled: !0 },
                                  callbacks: {
                                      open: function () {
                                          window.show_multiple_currencies && theme.CurrencyPicker.convert(".compare-content .money"), roar.handleReviews(), roar.handleCompareScroll();
                                      },
                                  },
                              });
                          },
                      });
            }),
                t.on("click", ".remove_from_compare", function (t) {
                    t.preventDefault();
                    var e = $(this).attr("data-rev");
                    $(".compare-content");
                    $('[data-pid="' + e + '"]')
                        .removeClass("added")
                        .attr("title", $('[data-pid="' + e + '"]').attr("data-add")),
                        $('[data-pid="' + e + '"]')
                            .find("span")
                            .html($('[data-pid="' + e + '"]').attr("data-add"));
                    var i = decodeURI(RoarCookie.cookie.rtread("rt-compare"));
                    null != i && (i = i.split(",")),
                        (i = jQuery.grep(i, function (t) {
                            return t != e;
                        })),
                        (i = $.trim(i)),
                        RoarCookie.cookie.rtwrite("rt-compare", i),
                        $(".fastor_" + e).remove(),
                        0 >= i.length && $(".mfp-close").trigger("click");
                });
        },
        autoloadCompare: function () {
            if (0 != parseInt(theme.compare)) {
                var t = RoarCookie.cookie.rtread("rt-compare");
                null == t
                    ? (t = [])
                    : (t = t.split(",")).map(function (t) {
                          $('[data-pid="' + t + '"]')
                              .addClass("added")
                              .attr("title", $('[data-pid="' + t + '"]').attr("data-added")),
                              $('[data-pid="' + t + '"]')
                                  .find("span")
                                  .html($('[data-pid="' + t + '"]').attr("data-added"));
                      });
            }
        },
        handleCompareScroll: function () {
            jQuery("#be_compare_features_table").on("scroll", function () {
                var t = jQuery(this).parent();
                jQuery(this).scrollLeft() + jQuery(this).innerWidth() >= jQuery(this)[0].scrollWidth
                    ? t.hasClass("scroll-right") && t.removeClass("scroll-right")
                    : 0 === jQuery(this).scrollLeft()
                    ? t.hasClass("scroll-left") && t.removeClass("scroll-left")
                    : (!t.hasClass("scroll-right") && t.addClass("scroll-right"), !t.hasClass("scroll-left") && t.addClass("scroll-left"));
            }),
                (be_compare_container = document.getElementById("be_compare_features_table")),
                null !== be_compare_container &&
                    be_compare_container.offsetWidth < be_compare_container.scrollWidth &&
                    !jQuery("#be_compare_features_table_inner").hasClass("scroll-right") &&
                    jQuery("#be_compare_features_table_inner").addClass("scroll-right"),
                jQuery(window).on("resize", function () {
                    roar.be_compare_products_table_shadows();
                }),
                jQuery("#be_compare_features_table_inner").hasClass("scroll-left") || jQuery("#be_compare_features_table_inner").hasClass("scroll-right") ? $(".compareview").addClass("no-flex") : $(".compareview").removeClass("no-flex");
        },
        be_compare_products_table_shadows: function () {
            (be_compare_container = document.getElementById("be_compare_features_table")),
                null === be_compare_container ||
                    (be_compare_container.offsetWidth < be_compare_container.scrollWidth
                        ? !jQuery("#be_compare_features_table_inner").hasClass("scroll-right") && jQuery("#be_compare_features_table_inner").addClass("scroll-right")
                        : (jQuery("#be_compare_features_table_inner").hasClass("scroll-right") && jQuery("#be_compare_features_table_inner").removeClass("scroll-right"),
                          jQuery("#be_compare_features_table_inner").hasClass("scroll-left") && jQuery("#be_compare_features_table_inner").removeClass("scroll-left")),
                    jQuery("#be_compare_features_table_inner").hasClass("scroll-left") || jQuery("#be_compare_features_table_inner").hasClass("scroll-right")
                        ? $(".compareview").addClass("no-flex")
                        : $(".compareview").removeClass("no-flex"));
        },
        removeToWishlist: function () {
            $(document).on("click", ".remove-wishlist", function (t) {
                t.preventDefault();
                var e = $(this),
                    i = { action: "remove_wishlist" };
                return (
                    (i = e.closest("form").serialize() + "&" + $.param(i)),
                    $.ajax({
                        type: "POST",
                        url: "/a/wishlist",
                        async: !0,
                        cache: !1,
                        data: i,
                        dataType: "json",
                        beforeSend: function () {
                            $(".page-wishlist").addClass("is_loading");
                        },
                        error: function (t) {
                            console.log(t), $(".page-wishlist").removeClass("is_loading");
                        },
                        success: function (t) {
                            1 == t.code
                                ? e.closest(".item").slideUp("fast", function () {
                                      e.closest(".item").remove(), $(".page-wishlist .infos").removeClass("hide"), $(".wishlist_items_number").text(t.json), 0 == t.json && $(".wishlist-empty").removeClass("hide");
                                  })
                                : (alert(t.json), console.log(t.json)),
                                $(".page-wishlist").removeClass("is_loading");
                        },
                    }),
                    !1
                );
            });
        },
        addToWishlist: function () {
            $(document).on("click", ".add-to-wishlist:not(.added)", function () {
                if ($(this).hasClass("need-login")) {
                    var t = $("#wishlist_error").html();
                    return $.notify({ message: t, target: "_blank" }, { type: "info", showProgressbar: !0, z_index: 2031, mouse_over: "pause", placement: { from: "top", align: window.rtl ? "left" : "right" } }), !1;
                }
                var e = $(this),
                    a = { action: "add_wishlist" };
                return (
                    (a = e.closest("form").serialize() + "&" + $.param(a)),
                    $.ajax({
                        type: "POST",
                        url: "/a/wishlist",
                        async: !0,
                        cache: !1,
                        data: a,
                        dataType: "json",
                        beforeSend: function () {
                            e.hasClass("btooltip") ? e.addClass("loading") : e.attr("title", e.attr("data-loading-text")).find("span").text(e.attr("data-loading-text"));
                        },
                        complete: function () {
                            e.hasClass("btooltip") && e.removeClass("loading"),
                                $(".wishlist" + e.prev().val())
                                    .attr("title", e.attr("data-added"))
                                    .addClass("added")
                                    .find("span")
                                    .text(e.attr("data-added"));
                        },
                        error: function (t) {
                            var e = (i = $.parseJSON(t.responseText)),
                                a = e.message + ": " + e.description;
                            $.notify({ message: a, target: "_blank" }, { type: "info", showProgressbar: !0, z_index: 2031, mouse_over: "pause", placement: { from: "top", align: window.rtl ? "left" : "right" } });
                        },
                        success: function () {
                            var t = e.closest(".product"),
                                i = [{ product_url: t.find(".name a").attr("href"), product_name: t.find(".name a").text() }];
                            $.notify(
                                { message: $("<div>").append($("#wishlist_success").tmpl(i).clone()).html(), target: "_blank" },
                                { type: "success", showProgressbar: !0, z_index: 2031, mouse_over: "pause", placement: { from: "top", align: window.rtl ? "left" : "right" } }
                            );
                        },
                    }),
                    !1
                );
            });
        },
        addToCart: function () {
            "direct" != window.shopping_cart_type &&
                $(document).on("click", ".add-to-cart:not(.disabled)", function () {
                    var t = $(this),
                        e = t.closest("form");
                    return (
                        $.ajax({
                            type: "POST",
                            url: window.root_url + "/cart/add.js",
                            async: !0,
                            cache: !1,
                            data: e.serialize(),
                            dataType: "json",
                            beforeSend: function () {
                                t.hasClass("btooltip") ? t.addClass("loading") : t.button("loading") && $("#filter-addtocart span").text(t.attr("data-loading-text")) && $("#filter-addtocart").addClass("active");
                            },
                            complete: function () {
                                t.hasClass("btooltip") ? t.removeClass("loading") : t.button("reset") && $("#filter-addtocart").removeClass("active");
                            },
                            error: function (t) {
                                roar.updateCart(t, !1);
                            },
                            success: function (t) {
                                "sidebar" == window.shopping_cart_type ? roar.updateCartSidebar(t, !0) : roar.updateCart(t, !0);
                            },
                        }).done(function () {}),
                        !1
                    );
                });
        },
        cartSidebar: function () {
            "sidebar" != window.shopping_cart_type ||
                ($("body").on("click", ".cart-item a.remove-cart", function (t) {
                    t.preventDefault();
                    var e = $(this),
                        i = e.attr("data-id");
                    $.ajax({
                        type: "POST",
                        url: window.root_url + "/cart/change.js",
                        data: "quantity=0&id=" + i,
                        dataType: "json",
                        beforeSend: function () {
                            $(".cart-window-body").addClass("loading");
                        },
                        success: function () {
                            $.ajax({
                                url: "/search",
                                beforeSend: function () {},
                                success: function () {
                                    roar.updateCart(e, !0);
                                },
                                error: function (t) {
                                    console.log(t);
                                },
                            }).done(function () {
                                $(".cart-window-body").removeClass("loading");
                            });
                        },
                        error: function (t, e) {
                            Shopify.onError(t, e), $(".cart-window-body").removeClass("loading");
                        },
                    });
                }),
                $(document)
                    .on("focus", "#cart_info .update", function () {
                        $(this).select();
                    })
                    .on("blur", "#cart_info .update", function () {
                        var t = $(this),
                            e = t.val(),
                            i = t.attr("data-id");
                        $.ajax({
                            type: "POST",
                            url: window.root_url + "/cart/change.js",
                            data: "quantity=" + e + "&id=" + i,
                            dataType: "json",
                            beforeSend: function () {
                                $(".cart-window-body").addClass("loading");
                            },
                            success: function () {
                                roar.updateCart(t, !0);
                            },
                            error: function (t, e) {
                                Shopify.onError(t, e);
                            },
                        }).done(function () {
                            $(".cart-window-body").removeClass("loading");
                        });
                    }),
                $("body").on("click", ".cart-block-click", function (t) {
                    t.preventDefault(), t.target !== this || $(".cart-window-bg").toggleClass("window-hide");
                }),
                $("body").on("click", ".close-cart", function (t) {
                    t.preventDefault(), $(".cart-window-bg").addClass("window-hide");
                }),
                $("body").on("click", ".qty-btn.cart-plus", function () {
                    var t = $(this).data("id"),
                        e = parseInt($(t).val()) + 1;
                    $(t).val(e);
                    var i = $(t),
                        a = i.val(),
                        n = i.attr("data-id");
                    $.ajax({
                        type: "POST",
                        url: window.root_url + "/cart/change.js",
                        data: "quantity=" + a + "&id=" + n,
                        dataType: "json",
                        beforeSend: function () {
                            $(".cart-window-body").addClass("loading");
                        },
                        success: function () {
                            roar.updateCart(i, !0);
                        },
                        error: function (t, e) {
                            Shopify.onError(t, e);
                        },
                    }).done(function () {
                        $(".cart-window-body").removeClass("loading");
                    });
                }),
                $("body").on("click", ".qty-btn.cart-minus", function () {
                    var t = $(this).data("id"),
                        e = parseInt($(t).val());
                    if (1 < e) {
                        $(t).val(e - 1);
                        var i = $(t),
                            a = i.val(),
                            n = i.attr("data-id"),
                            o = {
                                type: "POST",
                                url: window.root_url + "/cart/change.js",
                                data: "quantity=" + a + "&id=" + n,
                                dataType: "json",
                                beforeSend: function () {
                                    $(".cart-window-body").addClass("loading");
                                },
                                success: function () {
                                    roar.updateCart(i, !0);
                                },
                                error: function (t, e) {
                                    Shopify.onError(t, e);
                                },
                            };
                        $.ajax(o).done(function () {
                            $(".cart-window-body").removeClass("loading");
                        });
                    }
                }));
        },
        updateCartSidebar: function () {
            $.ajax({
                url: "/search",
                beforeSend: function () {
                    $(".cart-window-body").addClass("loading");
                },
                success: function (t) {
                    var e = "div#cart_block",
                        i = "div#cart_popup",
                        a = ".mobile-nav-cart",
                        n = "#filter-cart",
                        o = "div#cart-sidebar";
                    0 < $(o).length &&
                        ($(o).html($(t).find(o).html()),
                        setTimeout(function () {
                            $(".cart-block-click").trigger("click");
                        }, 100)),
                        $(e).html($(t).find(e).html()),
                        $(i).html($(t).find(i).html()),
                        $(a).html($(t).find(a).html()),
                        $(n).html($(t).find(n).html()),
                        window.show_multiple_currencies && (theme.CurrencyPicker.convert("#cart_block .money"), theme.CurrencyPicker.convert("#cart_popup .money"), theme.CurrencyPicker.convert("#cart-sidebar .money")),
                        roar.handleReviews();
                },
                error: function (t) {
                    console.log(t);
                },
            }).done(function () {
                $(".cart-window-body").removeClass("loading");
            });
        },
        updateCart: function (t, e) {
            if (1 == e)
                "sidebar" == window.shopping_cart_type
                    ? $.ajax({
                          url: "/search",
                          beforeSend: function () {
                              $(".cart-window-body").addClass("loading");
                          },
                          success: function (t) {
                              var e = "div#cart_block",
                                  i = "div#cart_popup",
                                  a = ".mobile-nav-cart",
                                  n = "#filter-cart",
                                  o = "#cart-sidebar";
                              0 < $(o).length && $(o).html($(t).find(o).html()),
                                  $(e).html($(t).find(e).html()),
                                  $(i).html($(t).find(i).html()),
                                  $(a).html($(t).find(a).html()),
                                  $(n).html($(t).find(n).html()),
                                  window.show_multiple_currencies && (theme.CurrencyPicker.convert("#cart_block .money"), theme.CurrencyPicker.convert("#cart_popup .money"), theme.CurrencyPicker.convert("#cart-sidebar .money")),
                                  roar.handleReviews();
                          },
                          error: function (t) {
                              console.log(t);
                          },
                      }).done(function () {
                          $(".cart-window-body").removeClass("loading");
                      })
                    : $.ajax({
                          url: window.root_url + "/search?view=cart&q=" + t.handle + "_sp_" + t.variant_id + "_sp_" + t.quantity + "_sp_" + t.price,
                          beforeSend: function () {},
                          success: function (t) {
                              var e = "div#cart_block",
                                  i = "div#cart_popup",
                                  a = ".mobile-nav-cart",
                                  n = "#filter-cart";
                              $(e).html($(t).filter(e).html()),
                                  $(i).html($(t).filter(i).html()),
                                  $(a).html($(t).filter(a).html()),
                                  $(n).html($(t).filter(n).html()),
                                  window.show_multiple_currencies && (theme.CurrencyPicker.convert("#cart_popup .money"), theme.CurrencyPicker.convert("#cart_block .money"));
                          },
                          error: function (t) {
                              console.log(t);
                          },
                      }).done(function () {
                          if ("ajax_notify" == window.shopping_cart_type) {
                              var i = [{ product_url: t.url, product_name: t.title }];
                              $.notify(
                                  { message: $("<div>").append($("#cart_success").tmpl(i).clone()).html(), target: "_blank" },
                                  { type: "success", showProgressbar: !0, z_index: 2031, mouse_over: "pause", placement: { from: "top", align: window.rtl ? "left" : "right" } }
                              );
                          } else roar.popupCart(e);
                      });
            else {
                var a = $.parseJSON(t.responseText);
                $.ajax({
                    url: "/search?view=cart_error&q=" + a.description,
                    beforeSend: function () {},
                    success: function (t) {
                        var e = "div#cart_error_popup";
                        $(e).html($(t).filter(e).html());
                    },
                    error: function (t) {
                        console.log(t);
                    },
                }).done(function () {
                    if ("ajax_notify" == window.shopping_cart_type) {
                        var a = (i = $.parseJSON(t.responseText)),
                            n = a.message + ": " + a.description;
                        $.notify({ message: n, target: "_blank" }, { type: "info", showProgressbar: !0, z_index: 2031, mouse_over: "pause", placement: { from: "top", align: window.rtl ? "left" : "right" } });
                    } else roar.popupCart(e);
                });
            }
        },
        removeCart: function () {
            $(document).on("click", ".mini-cart-info .remove a", function (t) {
                t.preventDefault();
                var e = $(this).attr("data-id");
                $.ajax({
                    type: "POST",
                    url: window.root_url + "/cart/change.js",
                    data: "quantity=0&id=" + e,
                    dataType: "json",
                    beforeSend: function () {
                        $("#cart_content").addClass("loading");
                    },
                    success: function () {
                        $.ajax({
                            url: "/search?view=cart",
                            beforeSend: function () {},
                            success: function (t) {
                                var e = "div#cart_block",
                                    i = "div#cart_popup",
                                    a = ".mobile-nav-cart",
                                    n = "#filter-cart";
                                $(e).html($(t).filter(e).html()),
                                    $(i).html($(t).filter(i).html()),
                                    $(a).html($(t).filter(a).html()),
                                    $(n).html($(t).filter(n).html()),
                                    window.show_multiple_currencies && (theme.CurrencyPicker.convert("#cart_popup .money"), theme.CurrencyPicker.convert("#cart_block .money"));
                            },
                            error: function (t) {
                                console.log(t);
                            },
                        }).done(function () {
                            $("#cart_content").removeClass("loading");
                        });
                    },
                    error: function (t, e) {
                        Shopify.onError(t, e), $("#cart_content").removeClass("loading");
                    },
                });
            });
        },
        popupCart: function (t) {
            1 == t
                ? $.magnificPopup.open({
                      items: { src: "#cart_popup", type: "inline" },
                      tLoading: "",
                      mainClass: "popup-module mfp-with-zoom popup-type-1",
                      removalDelay: 200,
                      callbacks: {
                          open: function () {
                              $("#cart_popup .continue-shopping").unbind("click"),
                                  $("body").on("click", "#cart_popup .continue-shopping", function (t) {
                                      t.preventDefault(), $.magnificPopup.close();
                                  });
                          },
                      },
                  })
                : $.magnificPopup.open({ items: { src: "#cart_error_popup", type: "inline" }, tLoading: "", mainClass: "popup-module mfp-with-zoom popup-type-1", removalDelay: 200 });
        },
        handlePopups: function () {
            function t() {
                if (
                    (0 == window.popup_mailchimp_expire
                        ? $("#popup-mailchimp .dont-show-me").change(function () {
                              $(this).is(":checked") ? e() : i();
                          })
                        : 1 == window.popup_mailchimp_expire && i(),
                    !(function () {
                        try {
                            var t = "popup-module-mailchimp";
                            if (0 < document.cookie.length) {
                                var e = document.cookie.indexOf(t + "=");
                                if (-1 != e) {
                                    e = e + t.length + 1;
                                    var i = document.cookie.indexOf(";", e);
                                    return -1 == i && (i = document.cookie.length), unescape(document.cookie.substring(e, i));
                                }
                            }
                        } catch (t) {
                            console.log(t.message);
                        }
                    })())
                ) {
                    var t = parseInt(window.popup_mailchimp_delay, 20),
                        a = parseInt(window.popup_mailchimp_close, 20);
                    setTimeout(function () {
                        $.magnificPopup.open({ items: { src: "#popup-mailchimp", type: "inline" }, tLoading: "", mainClass: "popup-module mfp-with-zoom popup-type-1", removalDelay: 200 }),
                            0 < a &&
                                setTimeout(function () {
                                    $.magnificPopup.close();
                                }, a);
                    }, t),
                        2 == window.popup_mailchimp_expire && e();
                }
                var n = $("#mc-form"),
                    o = n.attr("action");
                n.ajaxChimp({ url: o, callback: function () {} });
            }
            function e() {
                try {
                    var t = parseInt(window.popup_mailchimp_period);
                    0 >= t && (t = 1);
                    var e = "domain=." + document.domain,
                        i = new Date();
                    i.setTime(i.getTime() + 24 * t * 60 * 60 * 1e3);
                    var a = "; expires=" + i.toGMTString();
                    document.cookie = "popup-module-mailchimp=true" + a + "; path=/; " + e;
                } catch (t) {
                    console.log(t.message);
                }
            }
            function i() {
                try {
                    var t = "domain=." + document.domain;
                    document.cookie = "popup-module-mailchimp=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; " + t;
                } catch (t) {
                    console.log(t.message);
                }
            }
            $("#popup-mailchimp").length && ($("#popup-mailchimp").hasClass("hidden-xs") ? 768 <= roar.getWidthBrowser() && t() : t());
        },
        handleVerticalMenu: function () {
            $(".category_trigger").click(function () {
                (768 > roar.getWidthBrowser() || $("html").hasClass("touch")) &&
                    ($(".shop_category").hasClass("is_open")
                        ? ($(".shop_category").removeClass("is_open"), $(".shop_category .submenu-group").slideUp())
                        : ($(".shop_category").addClass("is_open"), $(".shop_category .submenu-group").slideDown()));
            }),
                $(".shop_category .has-children>span>.fa").click(function () {
                    var t = $(this).closest(".menu-item"),
                        e = t.find(".submenu");
                    (768 > roar.getWidthBrowser() || $("html").hasClass("touch")) && (t.hasClass("is_open") ? (t.removeClass("is_open"), e.slideUp()) : (t.addClass("is_open"), e.slideDown()));
                });
        },
        updateGroupedPrice: function () {
            if (0 != $("#grouped-price").length) {
                var t = 0;
                $(".grouped-product-item .grouped-checkbox").each(function () {
                    $(this).is(":checked") &&
                        ((t += parseFloat($($(this).data("id")).find("div.price").data("price"))),
                        $("#grouped-price").html('<span class="money">' + theme.Currency.formatMoney(t, theme.settings.moneyFormat) + "</span>"),
                        window.show_multiple_currencies && theme.CurrencyPicker.convert("#grouped-price .money"));
                });
            }
        },
        handleQuickshop: function (t) {
            t = t || "body";
            var e = "";
            return (
                $(t)
                    .find(".quickview .quick_view")
                    .magnificPopup({
                        type: "ajax",
                        preloader: !0,
                        tLoading: "",
                        mainClass: "quickview",
                        removalDelay: 200,
                        gallery: { enabled: !1 },
                        callbacks: {
                            open: function () {
                                0 < $("#main").next(".product-360-view-wrapper").length && $("#main").next(".product-360-view-wrapper").remove();
                            },
                            ajaxContentAdded: function () {
                                roar.handleReviews(),
                                    new theme.Sections().register("product-quickview-template", theme.Product),
                                    roar.initCountdown(),
                                    window.show_multiple_currencies && theme.CurrencyPicker.convert("#ProductSection-product-quickview-template .money"),
                                    Shopify.PaymentButton.init();
                                var t = $(".quickview").find(".add-to-wishlist");
                                t.attr("title", t.attr("data-added")).addClass("added").find("span").text(t.attr("data-added"));
                            },
                            beforeClose: function () {
                                0 < $(".quickview._reopen").length && "" != $(".quickview._reopen").data("_qid") && (e = $(".quickview._reopen").data("_qid"));
                            },
                            afterClose: function () {
                                "" != e && ($(e).trigger("click"), (e = ""));
                            },
                        },
                    }),
                !1
            );
        },
        mapClearFilter: function () {
            $(".mfilter-box .column").each(function () {
                var t = $(this);
                0 < t.find("input:checked").length &&
                    t.find(".clear").on("click", function (e) {
                        var i = [];
                        Shopify.queryParams.constraint && (i = Shopify.queryParams.constraint.split("+")),
                            t.find("input:checked").each(function () {
                                var t = $(this).val();
                                if (t) {
                                    var e = i.indexOf(t);
                                    0 <= e && i.splice(e, 1);
                                }
                            }),
                            i.length ? (Shopify.queryParams.constraint = i.join("+")) : delete Shopify.queryParams.constraint,
                            roar.filterAjaxClick(),
                            e.preventDefault();
                    });
            });
        },
        mapSingleFilter: function () {
            $("body").on("change", ".advanced-filter .field:not(.disable) input", function () {
                var t = $(this).parent(),
                    e = $(this).val(),
                    i = [];
                if ((Shopify.queryParams.constraint && (i = Shopify.queryParams.constraint.split("+")), !window.enable_filter_multiple_choice && !t.hasClass("active"))) {
                    var a = t.parents(".advanced-filter").find(".active");
                    0 < a.length &&
                        a.each(function () {
                            var t = $(this).data("handle");
                            if (($(this).removeClass("active"), t)) {
                                var e = i.indexOf(t);
                                0 <= e && i.splice(e, 1);
                            }
                        });
                }
                if (e) {
                    var n = i.indexOf(e);
                    0 > n ? (i.push(e), t.addClass("active")) : (i.splice(n, 1), t.removeClass("active"));
                }
                i.length ? (Shopify.queryParams.constraint = i.join("+")) : delete Shopify.queryParams.constraint, roar.filterAjaxClick();
            });
        },
        mapSingleCollection: function () {
            $("body").on("click", ".advanced-collection .field", function (t) {
                var e = $(this),
                    i = e.attr("href");
                e.hasClass("active") || (roar.filterAjaxClick(i), $(".advanced-collection .field").removeClass("active"), e.addClass("active"), t.preventDefault());
            });
        },
        mapSingleSort: function () {
            $("body").on("change", ".advanced-sortby .field", function (t) {
                var e = $(this).val();
                (Shopify.queryParams.sort_by = e), roar.filterAjaxClick(), t.preventDefault();
            });
        },
        mapSingleLimit: function () {
            $("body").on("change", ".advanced-limit .field", function (t) {
                var e = $(this).val();
                (Shopify.queryParams.view = e), roar.filterAjaxClick(), t.preventDefault();
            });
        },
        mapSinglePagination: function () {
            $("body").on("click", "#mfilter-content-container .advanced-pagination a", function (t) {
                var e = $(this);
                delete Shopify.queryParams.page, delete Shopify.queryParams.constraint, delete Shopify.queryParams.q, delete Shopify.queryParams.sort_by, roar.filterAjaxClickPaging(e.attr("href")), t.preventDefault();
            });
        },
        mapFilters: function () {
            roar.handleGridList(), roar.handleShopView(), roar.mapPagination();
        },
        mapPaginationCallback: function () {
            roar.handleGridList(),
                roar.handleShopView(),
                roar.handleQuickshop(),
                roar.handleReviews(),
                roar.initCountdown(),
                roar.initProductQuickShopItem("#mfilter-content-container"),
                roar.initLazyLoading("#sandbox", !0),
                window.show_multiple_currencies && theme.CurrencyPicker.convert("#sandbox .money");
        },
        mapPagination: function () {
            if (
                ($(document.body).on("click", ".fastor_ajax_load_button a", function (t) {
                    if ((t.preventDefault(), $(".pagination a.next").length)) {
                        $(".fastor_ajax_load_button a").attr("data-processing", 1);
                        var e = $(".pagination a.next").attr("href"),
                            i = $(".fastor_ajax_load_button a").attr("data-loading-items"),
                            a = $(".fastor_ajax_load_button a").attr("data-no-more");
                        $(".fastor_ajax_load_button").hide(),
                            $(".pagination").before('<div class="fastor_ajax_load_more_loader animated fadeIn"><a href="#"><i class="icon-px-outline-load"></i>&nbsp;&nbsp;<span>' + i + "</span></a></div>"),
                            $.get(e, function (t) {
                                $(".advanced-pagination").html($(t).find(".advanced-pagination").html()),
                                    $(t)
                                        .find(".product-list .product")
                                        .each(function () {
                                            $(".product-list .product:last").after($(this));
                                        }),
                                    $(t)
                                        .find(".product-grid .product-item")
                                        .each(function () {
                                            $(".product-grid .product-item:last").after($(this));
                                        }),
                                    roar.mapPaginationCallback(),
                                    $(".fastor_ajax_load_more_loader").fadeOut("slow"),
                                    $(".fastor_ajax_load_button").fadeIn("slow"),
                                    $(".fastor_ajax_load_button a").attr("data-processing", 0),
                                    0 == $(".pagination a.next").length &&
                                        ($(".fastor_ajax_load_button").addClass("finished").removeClass("fastor_ajax_load_more_hidden"), $(".fastor_ajax_load_button a").show().html(a).addClass("disabled"));
                            });
                    } else {
                        a = $(".fastor_ajax_load_button a").attr("data-no-more");
                        $(".fastor_ajax_load_button").addClass("finished").removeClass("fastor_ajax_load_more_hidden"), $(".fastor_ajax_load_button a").show().html(a).addClass("disabled");
                    }
                }),
                $(".fastor_ajax_load_button").hasClass("fastor_ajax_load_more_hidden"))
            ) {
                var t = Math.abs(0);
                $(window).scroll(function () {
                    $(".products").length &&
                        $(".products").offset().top + $(".products").outerHeight() - $(window).scrollTop() - t < $(window).height() &&
                        0 == $(".fastor_ajax_load_button a").attr("data-processing") &&
                        $(".fastor_ajax_load_button a").trigger("click");
                });
            }
        },
        filterCreateUrl: function (t) {
            var e = $.param(Shopify.queryParams).replace(/%2B/g, "+");
            return t ? ("" == e ? t : t + "?" + e) : location.pathname + "?" + e;
        },
        updateQueryStringParameter: function (t, e, i) {
            var a = new RegExp("([?&])" + e + "=.*?(&|$)", "i"),
                n = -1 === t.indexOf("?") ? "?" : "&";
            return t.match(a) ? t.replace(a, "$1" + e + "=" + i + "$2") : t + n + e + "=" + i;
        },
        filterCreateUrlPaging: function (t) {
            var e = 1,
                i = t.split("page=");
            return 1 < i.length && (e = parseInt(i[1])), roar.updateQueryStringParameter(window.location.href, "page", e);
        },
        filterAjaxClick: function (t) {
            delete Shopify.queryParams.page;
            var e = roar.filterCreateUrl(t);
            roar.filterGetContent(e);
        },
        filterAjaxClickPaging: function (t) {
            delete Shopify.queryParams.page;
            var e = roar.filterCreateUrlPaging(t);
            roar.filterGetContent(e);
        },
        filterGetContent: function (t) {
            $.ajax({
                type: "get",
                url: t,
                beforeSend: function () {
                    roar.destroyCountdown(), $("body").addClass("is_loading").removeClass("open_filter");
                },
                success: function (e) {
                    var i = e.match("<title>(.*?)</title>")[1];
                    $(e).find(".breadcrumb-content").length && $(".breadcrumb-content").html($(e).find(".breadcrumb-content").html()),
                        $(".category-info").remove(),
                        $(e).find(".category-info").length && $("#mfilter-content-container").prepend($(e).find(".category-info")),
                        $("#sandbox").empty().html($(e).find("#sandbox").html()),
                        $(".mfilter-box .mfilter-content").empty().html($(e).find(".mfilter-box .mfilter-content").html()),
                        $("#mfilter-content-container .advanced-pagination").empty().html($(e).find("#mfilter-content-container .advanced-pagination").html()),
                        $(".page-top").empty().html($(e).find(".page-top").html()),
                        History.pushState({ param: Shopify.queryParams }, i, t),
                        setTimeout(function () {
                            $("html,body").animate({ scrollTop: $("body #sandbox").offset().top }, 500, "swing");
                        }, 100),
                        $("body").removeClass("is_loading"),
                        roar.mapClearFilter(),
                        roar.handleQuickshop(),
                        roar.handleReviews(),
                        roar.initCountdown(),
                        roar.initProductQuickShopItem("#mfilter-content-container"),
                        roar.initFilterSidebar(),
                        roar.initLazyLoading("#sandbox", !0),
                        window.show_multiple_currencies && theme.CurrencyPicker.convert("#sandbox .money");
                },
                error: function () {
                    $("body").removeClass("is_loading");
                },
            });
        },
        handleReviews: function () {
            "undefined" != typeof SPR && (SPR.registerCallbacks(), SPR.initRatingHandler(), SPR.initDomEls(), SPR.loadProducts(), SPR.loadBadges());
        },
        convertToSlug: function (t) {
            return t
                .toLowerCase()
                .replace(/[^\w\u00C0-\u024f]+/g, "-")
                .replace(/^-+|-+$/g, "");
        },
        getWidthBrowser: function () {
            var t;
            return (
                "number" == typeof window.innerWidth
                    ? (t = window.innerWidth)
                    : document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)
                    ? (t = document.documentElement.clientWidth)
                    : document.body && (document.body.clientWidth || document.body.clientHeight) && (t = document.body.clientWidth),
                t
            );
        },
        handleScrollToTop: function () {
            $(window).scroll(function () {
                if (767 < $(window).width()) {
                    var t = $(this).scrollTop(),
                        e = $(this).height(),
                        i = 1;
                    0 < t && (i = t + e / 2);
                    var a = $("#scroll-top");
                    1e3 > i ? a.removeClass("on") : a.addClass("on");
                } else {
                    t = $(this).scrollTop();
                    if (0 < $("#shopify-section-mobile-nav").length) e = $("#shopify-section-mobile-nav").offset().top + $("#shopify-section-mobile-nav").height();
                    else e = $("header").offset().top + $("header").height();
                    a = $("#widgets");
                    e > t ? a.removeClass("on") : a.addClass("on");
                }
            }),
                $("#scroll-top").click(function (t) {
                    t.preventDefault(), $("html,body").animate({ scrollTop: 0 }, 800, "swing");
                });
        },
        handleGMap: function () {
            $("#contact_map").length &&
                $().gMap &&
                $("#contact_map").gMap({ zoom: 17, scrollwheel: !1, maptype: "ROADMAP", markers: [{ address: window.contact_map_address, html: "_address", icon: { iconsize: [188, 68], iconanchor: [0, 68] } }] });
        },
        handleGridList: function () {
            $(document).on("click", "#grid", function () {
                $("#mfilter-content-container").removeClass("list").addClass("grid");
            }),
                $(document).on("click", "#list", function () {
                    $("#mfilter-content-container").removeClass("grid").addClass("list"), $("body").removeClass("flex-view-2 flex-view-3 flex-view-4 flex-view-6").addClass("flex-view-1");
                });
        },
        handleShopView: function () {
            var t;
            0 < $("#mfilter-content-container .shop__view").length &&
                ($("#mfilter-content-container .shop__view").unbind("click"),
                $("#mfilter-content-container .shop__view").on("click", function () {
                    "flex-view-1 flex-view-" + $("#mfilter-content-container .shop__view.active").data("per_row"),
                        !$(this).hasClass("active") &&
                            ("grid" == $(this).data("view")
                                ? ((t = "flex-view-" + $(this).data("per_row")),
                                  $(document.body).removeClass("flex-view-1 flex-view-2 flex-view-3 flex-view-4 flex-view-6").addClass(t),
                                  $("#mfilter-content-container").removeClass("list").addClass("grid"))
                                : ($("#mfilter-content-container").removeClass("grid").addClass("list"), $("body").removeClass("flex-view-2 flex-view-3 flex-view-4 flex-view-6").addClass("flex-view-1")),
                            $("#mfilter-content-container .shop__view").removeClass("active"),
                            $(this).addClass("active")),
                        roar.initLazyLoading();
                }));
        },
        handleSearch: function () {
            $(".button-search, .header-type-3 #top .search_form, .header-type-8 .search_form").bind("click", function () {
                $(this).closest("form").submit();
            });
        },
        handleSmoothScroll: function () {
            $(document).on("click", ".smoothscroll", function (t) {
                t.preventDefault();
                var e = $(this).attr("href");
                $(e).trigger("click"),
                    setTimeout(function () {
                        $("html,body").animate({ scrollTop: $(e).offset().top - 100 }, 800, "swing");
                    }, 300);
            });
        },
        handleOrder: function () {
            $(".orderable").each(function (t, e) {
                var i = $(e).children("div[data-order]");
                i.sort(function (t, e) {
                    return +$(t).data("order") - +$(e).data("order");
                }),
                    i.appendTo(e);
            });
        },
        handleDropdown: function () {
            $("[data-toggle='dropdown']").on("click", function () {
                $(this).parent().toggleClass("open");
            });
        },
    },
    roarLookbook = {
        getSizedImageUrl: function (t, e) {
            if ((((a = document.createElement("a")).href = t), "cdn.shopify.com" != a.hostname)) return t;
            if (null == e) return t;
            if ("master" == e) return roarLookbook.removeProtocol(t);
            var i = t.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);
            if (null != i) {
                var a = t.split(i[0]),
                    n = i[0];
                return roarLookbook.removeProtocol(a[0] + "_" + e + n);
            }
            return null;
        },
        removeProtocol: function (t) {
            return t.replace(/http(s)?:/, "");
        },
        isProductUrl: function (t) {
            var e = window.location.hostname,
                i = document.createElement("a");
            return (i.href = t), console.log(e), console.log(i.hostname), i.hostname == e;
        },
        buildLookbook: function () {
            $(".roarlookbook").each(function (t) {
                var e = $(this);
                if (!e.hasClass("roarlookbook_init")) {
                    var i = e.attr("data-lookbook"),
                        a = { lookbook: i, action: "lookbook_get" };
                    (a = $.param(a)),
                        $.ajax({
                            type: "POST",
                            url: "/apps/roarlookbook",
                            async: !0,
                            cache: !1,
                            data: a,
                            dataType: "json",
                            beforeSend: function () {},
                            error: function () {},
                            success: function (a) {
                                e.append(a);
                                var n = e.find(".media__blank-preview");
                                n.imagesLoaded(function () {
                                    e.addClass("roarlookbook_init").attr("data-lookbook", i + t), n.addClass("sfx-fadeIn");
                                });
                            },
                        });
                }
            });
        },
        resetHotspots: function (t) {
            var e = $(".hotspot", t),
                i = t.attr("data-lookbook");
            e.each(function () {
                var e = $(this),
                    a = e.attr("data-id"),
                    n = $("#" + i + "-" + a, t);
                n.fadeOut("fast", function () {
                    n.remove(), e.removeClass("hotspot_init");
                });
            });
        },
        hotspotPopup: function () {
            $(".roarlookbook").on("click", ".hotspot", function () {
                var t = $(this);
                if (t.hasClass("hotspot_init")) {
                    e = t.closest(".roarlookbook");
                    roarLookbook.resetHotspots(e);
                } else {
                    var e = t.closest(".roarlookbook"),
                        i = t.attr("data-id"),
                        a = t.closest(".roarlookbook").attr("data-lookbook") + "-" + i,
                        n = "#" + t.closest(".roarlookbook").attr("data-lookbook") + "-" + i,
                        o = t.attr("data-title"),
                        r = t.attr("data-image"),
                        s = t.attr("data-price"),
                        c = t.attr("data-url"),
                        l = "";
                    if ("" == o && "" == c) return !1;
                    if (
                        (roarLookbook.resetHotspots(e),
                        (l += '<div id="' + a + '" class="hotspot-widget hotspot-loading">'),
                        (l += '<div class="hotspot-content">'),
                        (l += '<span class="hotspot-close">×</span>'),
                        (l += '<div class="hotspot-inner">'),
                        "" != r)
                    ) {
                        var d =
                            '<img src="' +
                            roarLookbook.getSizedImageUrl(r, "80x") +
                            '" src="' +
                            roarLookbook.getSizedImageUrl(r, "300x") +
                            '" data-srcset="' +
                            roarLookbook.getSizedImageUrl(r, "300x") +
                            " 1x, " +
                            roarLookbook.getSizedImageUrl(r, "600x") +
                            ' 2x" alt="" />';
                        l += "" == c ? d : '<a href="' + c + '">' + d + "</a>";
                    }
                    if (
                        ("" != o && ((l += "<h3>"), (l += "" == c ? o : '<a href="' + c + '">' + o + "</a>"), (l += "</h3>")),
                        "" != s &&
                            ((l += '<div class="price"><span class="money">' + s + "</span></div>"),
                            roarLookbook.isProductUrl(c) &&
                                ((l += '<div class="hotspot-btns">'),
                                (l += '<div class="hotspot-btn"><a href="' + c + '">' + theme.apps.details + "</a></div>"),
                                (l += '<div class="hotspot-btn"><a class="roar_add_to_cart" href="' + c + '?add-to-cart=true">' + theme.apps.buyNow + "</a></div>"),
                                (l += "</div>"))),
                        (l += "</div>"),
                        (l += "</div>"),
                        (l += "</div>"),
                        $(n).length || e.append(l),
                        $(n).imagesLoaded(function () {
                            var i = $(n),
                                a = t.offset().left,
                                o = t.offset().top,
                                r = i.outerWidth(),
                                s = i.outerHeight(),
                                c = e.offset().left,
                                l = e.offset().top,
                                d = "hotspot-right";
                            50 > e.outerWidth() - (a + r) ? ((a = a - r - 5), (d = "hotspot-left")) : (a = a + t.outerWidth() + 5),
                                (o = o + t.outerHeight() / 2 - s / 2),
                                i
                                    .css({ left: a - c, top: o - l })
                                    .removeClass("hotspot-left")
                                    .removeClass("hotspot-right")
                                    .addClass(d),
                                t.addClass("hotspot_init"),
                                i.removeClass("hotspot-loading").fadeIn("fast");
                        }),
                        $(n).find("img").length)
                    ) {
                        var u = $(n).find("img");
                        u.attr("src", u.attr("data-src")).removeAttr("data-src").attr("srcset", u.attr("data-srcset")).removeAttr("data-srcset");
                    }
                }
            }),
                $(document).on("click", ".hotspot-close", function () {
                    var t = $(this).closest(".hotspot-widget"),
                        e = t.attr("id").split("-")[1];
                    $('.roarlookbook .hotspot[data-id="' + e + '"]').removeClass("hotspot_init"),
                        t.fadeOut("fast", function () {
                            t.remove();
                        });
                }),
                $(".roarlookbook").on("click", ".image-preview", function () {
                    var t = $(this).closest(".roarlookbook");
                    roarLookbook.resetHotspots(t);
                }),
                $(window).resize(function () {
                    $(".roarlookbook .hotspot_init").length &&
                        $(".roarlookbook .hotspot_init").each(function () {
                            $(this).removeClass("hotspot_init").trigger("click");
                        });
                });
        },
        addToCart: function () {
            $(document).on("click", ".roar_add_to_cart", function (t) {
                t.preventDefault();
                var e = $(this),
                    i = e.closest(".roarlookbook"),
                    a = e.attr("href");
                $.ajax({
                    type: "GET",
                    url: a,
                    beforeSend: function () {},
                    success: function (t) {
                        $(t).find('form[action="/cart/add"]').appendTo(i).submit().remove();
                    },
                    dataType: "html",
                });
            });
        },
        init: function () {
            $(".roarlookbook").length && (roarLookbook.buildLookbook(), roarLookbook.hotspotPopup(), roarLookbook.addToCart());
        },
    };
function onFullWidthOption(t) {
    _force_full_width(t),
        $(window).resize(function () {
            _force_full_width(t);
        });
}
function _force_full_width(t) {
    var e = $(".standard-body .full-width #shopify-section-" + t);
    if (window.rtl) {
        if (0 < e.size()) {
            e.width($("body").width()), e.css("right", "0px");
            i = e.offset();
            e.css("right", "-" + -1 * i.left + "px"), e.find(".container").css("padding-left", -1 * i.left), e.find(".container").css("padding-right", -1 * i.left);
        }
    } else if (0 < e.size()) {
        e.width($("body").width()), e.css("left", "0px");
        var i = e.offset();
        e.css("left", "-" + i.left + "px"), e.find(".container").css("padding-left", i.left), e.find(".container").css("padding-right", i.left);
    }
    var a = $(".standard-body .fixed #shopify-section-" + t);
    if (window.rtl) {
        if (0 < a.size()) {
            a.width($(".standard-body").width()), a.css("right", "0px");
            (i = a.offset()), (n = $(".standard-body").offset()), (o = i.left - n.left);
            a.css("right", "-" + -1 * o + "px"), a.find(".container").css("padding-left", -1 * o), a.find(".container").css("padding-right", -1 * o);
        }
    } else if (0 < a.size()) {
        a.width($(".standard-body").width()), a.css("left", "0px");
        var i = a.offset(),
            n = $(".standard-body").offset(),
            o = i.left - n.left;
        a.css("left", "-" + o + "px"), a.find(".container").css("padding-left", o), a.find(".container").css("padding-right", o);
    }
    var r = $(".standard-body .fixed2 #shopify-section-" + t);
    if (0 < r.size()) {
        r.width($("body").width()), r.css("left", "0px");
        i = r.offset();
        r.css("left", "-" + i.left + "px"), r.find(".container").css("padding-left", i.left), r.find(".container").css("padding-right", i.left);
    }
    var s = $(".fixed-body #shopify-section-" + t);
    if (window.rtl) {
        if (0 < s.size()) {
            s.width($(".fixed-body .main-fixed").width()), s.css("right", "0px");
            (i = s.offset()), (n = $(".fixed-body .main-fixed").offset()), (o = i.left - n.left);
            s.css("right", "-" + -1 * o + "px"), s.find(".container").css("padding-left", -1 * o), s.find(".container").css("padding-right", -1 * o);
        }
    } else if (0 < s.size()) {
        s.width($(".fixed-body .main-fixed").width()), s.css("left", "0px");
        i = s.offset();
        var n = $(".fixed-body .main-fixed").offset(),
            o = i.left - n.left;
        s.css("left", "-" + o + "px"), s.find(".container").css("padding-left", o), s.find(".container").css("padding-right", o);
    }
}
(theme.CurrencyPicker = (function () {
    function t() {
        if ("false" == a.original_price) return !1;
        var t = Currency.currentCurrency,
            e = Currency.cookie.read(),
            n = a.shop_currency;
        e && (t = e),
            $(i.selector).each(function () {
                var e = $(this);
                if ((e.removeAttr("data-currency-default"), n != t)) {
                    var i = e.attr("data-currency-" + n);
                    "USD" == n && (i += " USD"), e.attr("data-currency-default", i);
                }
            });
    }
    function e() {
        return $(i.currencyNotification).length
            ? Currency.currentCurrency == a.shop_currency
                ? void $(i.currencyNotification).removeClass("loaded").slideUp()
                : void $(i.currencyNotification).each(function () {
                      var t = $(this),
                          e = t.data("html"),
                          i = "<strong>" + Currency.currentCurrency + "</strong>";
                      (e = e.replace(/{{ current_currency }}/g, i)), t.html(e), t.hasClass("loaded") || t.addClass("loaded").slideDown();
                  })
            : void 0;
    }
    var i = {
            selector: ".money",
            container: ".currency__picker",
            currency: ".currency__picker .currency__switcher",
            currencyPicker: ".currency__picker .currency",
            currencyActive: ".currency__picker .currency.active",
            currencyCurrent: ".currency__picker .currency__current",
            currencyNotification: ".currency__notification",
        },
        a = { currency_format: "", shop_currency: "", default_currency: "", money_with_currency_format: "", money_format: "", auto_switch: "true", original_price: "true" };
    return {
        init: function () {
            if ($(i.currency).length) {
                var n = $(i.container);
                (a.currency_format = n.find(".currency_format").val()),
                    (a.shop_currency = n.find(".shop_currency").val()),
                    (a.default_currency = n.find(".default_currency").val()),
                    (a.money_with_currency_format = n.find(".money_with_currency_format").val()),
                    (a.money_format = n.find(".money_format").val()),
                    (a.auto_switch = n.find(".auto_switch").val()),
                    (a.original_price = n.find(".original_price").val()),
                    (Currency.format = a.currency_format);
                var o = a.shop_currency;
                (Currency.moneyFormats[o].money_with_currency_format = a.money_with_currency_format), (Currency.moneyFormats[o].money_format = a.money_format);
                var r = a.default_currency,
                    s = Currency.cookie.read();
                $(".money .money").each(function () {
                    $(this).parents(".money").removeClass("money");
                }),
                    $(i.selector).each(function () {
                        var t = $(this);
                        if (void 0 === t.attr("data-currency-" + a.shop_currency)) {
                            var e = t.text();
                            t.attr("data-currency-" + a.shop_currency, e);
                        }
                    }),
                    null == s
                        ? o === r
                            ? (Currency.currentCurrency = r)
                            : Currency.convertAll(o, r, i.selector)
                        : $(i.currency).length && 0 === $(i.currency + " .currency[data-code=" + s + "]").size()
                        ? ((Currency.currentCurrency = o), Currency.cookie.write(o))
                        : s === o
                        ? (Currency.currentCurrency = o)
                        : Currency.convertAll(o, s, i.selector),
                    $(i.currency).on("click", ".currency:not(.active)", function () {
                        var a = $(this).data("code");
                        Currency.convertAll(Currency.currentCurrency, a, i.selector),
                            $(i.currencyPicker).removeClass("active"),
                            $(this).addClass("active"),
                            $(i.currencyCurrent).text(Currency.currentCurrency).attr("data-code", Currency.currentCurrency),
                            t(),
                            e();
                    });
                window.selectCallback;
                $(i.currencyPicker).removeClass("active"),
                    $(i.currency + " .currency[data-code=" + Currency.currentCurrency + "]").addClass("active"),
                    $(i.currencyCurrent).text(Currency.currentCurrency).attr("data-code", Currency.currentCurrency),
                    t(),
                    (function () {
                        if ("false" == a.auto_switch) return !1;
                        null == Currency.cookie.read() &&
                            $.getJSON("//ipinfo.io/json", function (t) {
                                var e = JSON.parse(JSON.stringify(t, null, 2));
                                void 0 !== e.country &&
                                    $.getJSON("//restcountries.eu/rest/v1/alpha/" + e.country, function (t) {
                                        var e = t.currencies[0];
                                        $(i.currencyPicker + '[data-code="' + e + '"]').trigger("click");
                                    });
                            });
                    })(),
                    e();
            }
        },
        convert: function (e) {
            $(i.currency).length &&
                ($(e).each(function () {
                    var t = $(this);
                    if (void 0 === t.attr("data-currency-" + a.shop_currency)) {
                        var e = t.text();
                        t.attr("data-currency-" + a.shop_currency, e);
                    }
                }),
                Currency.convertAll(a.shop_currency, $(i.currencyActive).attr("data-code"), e, a.currency_format),
                t());
        },
        convertAll: function () {
            $(i.currency).length &&
                ($(i.selector).each(function () {
                    var t = $(this);
                    if (void 0 === t.attr("data-currency-" + a.shop_currency)) {
                        var e = t.text();
                        t.attr("data-currency-" + a.shop_currency, e);
                    }
                }),
                Currency.convertAll(a.shop_currency, $(i.currencyActive).attr("data-code"), i.selector),
                t());
        },
    };
})()),
    (theme.LanguagePicker = (function () {
        function t(t) {
            $(e.selector + " .goog-te-combo").val(t);
            var i,
                a = document.getElementsByClassName("goog-te-combo")[0],
                n = "change";
            document.createEvent ? ((i = document.createEvent("HTMLEvents")).initEvent(n, !0, !0), a.dispatchEvent(i)) : (((i = document.createEventObject()).eventType = n), a.fireEvent("on" + i.eventType, i));
        }
        var e = { language: ".language__picker .language__switcher", languagePicker: ".language__picker .language", languageCurrent: ".language__picker .language__current", selector: "#weketing_google_translate_element" };
        return {
            init: function () {
                $(e.language).length &&
                    $(e.selector).length &&
                    ($(e.selector).bind("google_translate", function () {
                        var i = weketingJS.settingsJS[8];
                        if ("yes" == i.enable) {
                            for (var a = i.default_language, n = i.custom_languages, o = weketingSGT.languages(), r = localStorage.getItem("roarStorage_language"), s = 0; s < n.length - 1; s++)
                                if (n[s] == a) {
                                    n.pop();
                                    break;
                                }
                            for (s = 0; s < n.length; s++)
                                if (n[s] == r) {
                                    a = r;
                                    break;
                                }
                            var c;
                            for (s = 0; s < n.length; s++)
                                (c = '<li class="language active notranslate" data-code="' + a + '">' + o[a] + "</li>"),
                                    n[s] != a && (c = '<li class="language notranslate" data-code="' + n[s] + '">' + o[n[s]] + "</li>"),
                                    $(e.language).append(c);
                            $(e.languageCurrent).text(o[a]), t(a);
                        }
                    }),
                    $("body").on("click", e.languagePicker + ":not(.active)", function () {
                        var i = $(this).data("code");
                        if ("" != i) {
                            var a = $(this).text();
                            $(e.languagePicker).removeClass("active"), $(e.languagePicker + '[data-code="' + i + '"]').addClass("active"), $(e.languageCurrent).text(a), localStorage.setItem("roarStorage_language", i), t(i);
                        }
                    }),
                    0 < $(".dropdown.language-switcher").length &&
                        $(".dropdown.language-switcher").hover(function () {
                            0 < $(".dropdown.language-switcher select").length && $(".dropdown.language-switcher select").attr("size", "4");
                        }));
            },
        };
    })()),
    (window.theme = window.theme || {}),
    (theme.Sections = function () {
        (this.constructors = {}),
            (this.instances = []),
            $(document)
                .on("shopify:section:load", this._onSectionLoad.bind(this))
                .on("shopify:section:unload", this._onSectionUnload.bind(this))
                .on("shopify:section:select", this._onSelect.bind(this))
                .on("shopify:section:deselect", this._onDeselect.bind(this))
                .on("shopify:block:select", this._onBlockSelect.bind(this))
                .on("shopify:block:deselect", this._onBlockDeselect.bind(this));
    }),
    (theme.Sections.prototype = _.assignIn({}, theme.Sections.prototype, {
        _createInstance: function (t, e) {
            var i = $(t),
                a = i.attr("data-section-id"),
                n = i.attr("data-section-type");
            if (((e = e || this.constructors[n]), !_.isUndefined(e))) {
                var o = _.assignIn(new e(t), { id: a, type: n, container: t });
                this.instances.push(o);
            }
        },
        _onSectionLoad: function (t) {
            var e = $("[data-section-id]", t.target)[0];
            e && this._createInstance(e), roar.initLazyLoading();
        },
        _onSectionUnload: function (t) {
            this.instances = _.filter(this.instances, function (e) {
                var i = e.id === t.originalEvent.detail.sectionId;
                return i && _.isFunction(e.onUnload) && e.onUnload(t), !i;
            });
        },
        _onSelect: function (t) {
            var e = _.find(this.instances, function (e) {
                return e.id === t.originalEvent.detail.sectionId;
            });
            !_.isUndefined(e) && _.isFunction(e.onSelect) && e.onSelect(t);
        },
        _onDeselect: function (t) {
            var e = _.find(this.instances, function (e) {
                return e.id === t.originalEvent.detail.sectionId;
            });
            !_.isUndefined(e) && _.isFunction(e.onDeselect) && e.onDeselect(t);
        },
        _onBlockSelect: function (t) {
            var e = _.find(this.instances, function (e) {
                return e.id === t.originalEvent.detail.sectionId;
            });
            !_.isUndefined(e) && _.isFunction(e.onBlockSelect) && e.onBlockSelect(t);
        },
        _onBlockDeselect: function (t) {
            var e = _.find(this.instances, function (e) {
                return e.id === t.originalEvent.detail.sectionId;
            });
            !_.isUndefined(e) && _.isFunction(e.onBlockDeselect) && e.onBlockDeselect(t);
        },
        register: function (t, e) {
            (this.constructors[t] = e),
                $("[data-section-type=" + t + "]").each(
                    function (t, i) {
                        this._createInstance(i, e);
                    }.bind(this)
                );
        },
    })),
    (window.slate = window.slate || {}),
    (theme.Images = {
        preload: function (t, e) {
            "string" == typeof t && (t = [t]);
            for (var i, a = 0; a < t.length; a++) (i = t[a]), this.loadImage(this.getSizedImageUrl(i, e));
        },
        loadImage: function (t) {
            new Image().src = t;
        },
        switchImage: function (t, e, i) {
            var a = this.imageSize(e.src),
                n = this.getSizedImageUrl(t.src, a);
            i ? i(n, t, e) : (e.src = n);
        },
        imageSize: function (t) {
            var e = t.match(/.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\.@]/);
            return null === e ? null : e[1];
        },
        getSizedImageUrl: function (t, e) {
            if (null == e) return t;
            if ("master" === e) return this.removeProtocol(t);
            var i = t.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);
            if (null != i) {
                var a = t.split(i[0]),
                    n = i[0];
                return this.removeProtocol(a[0] + "_" + e + n);
            }
            return null;
        },
        removeProtocol: function (t) {
            return t.replace(/http(s)?:/, "");
        },
    }),
    (theme.Currency = {
        formatMoney: function (t, e) {
            function i(t, e, i, a) {
                if (((i = i || ","), (a = a || "."), isNaN(t) || null === t)) return 0;
                var n = (t = (t / 100).toFixed(e)).split(".");
                return n[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + i) + (n[1] ? a + n[1] : "");
            }
            "string" == typeof t && (t = t.replace(".", ""));
            var a = "",
                n = /\{\{\s*(\w+)\s*\}\}/,
                o = e || "${{amount}}";
            switch (o.match(n)[1]) {
                case "amount":
                    a = i(t, 2);
                    break;
                case "amount_no_decimals":
                    a = i(t, 0);
                    break;
                case "amount_with_comma_separator":
                    a = i(t, 2, ".", ",");
                    break;
                case "amount_no_decimals_with_comma_separator":
                    a = i(t, 0, ".", ",");
                    break;
                case "amount_no_decimals_with_space_separator":
                    a = i(t, 0, " ");
                    break;
                case "amount_with_apostrophe_separator":
                    a = i(t, 2, "'");
            }
            return o.replace(n, a);
        },
    }),
    (slate.Variants = (function () {
        function t(t) {
            (this.$container = t.$container),
                (this.product = t.product),
                (this.singleOptionSelector = t.singleOptionSelector),
                (this.originalSelectorId = t.originalSelectorId),
                (this.enableHistoryState = t.enableHistoryState),
                (this.currentVariant = this._getVariantFromOptions()),
                $(this.singleOptionSelector, this.$container).on("change", this._onSelectChange.bind(this));
        }
        return (
            (t.prototype = _.assignIn({}, t.prototype, {
                _getCurrentOptions: function () {
                    var t = _.map($(this.singleOptionSelector, this.$container), function (t) {
                        var e = $(t),
                            i = e.attr("type"),
                            a = {};
                        return "radio" === i || "checkbox" === i ? !!e[0].checked && ((a.value = e.val()), (a.index = e.data("index")), a) : ((a.value = e.val()), (a.index = e.data("index")), a);
                    });
                    return (t = _.compact(t));
                },
                _getVariantFromOptions: function () {
                    var t = this._getCurrentOptions(),
                        e = this.product.variants;
                    return _.find(e, function (e) {
                        return t.every(function (t) {
                            return _.isEqual(e[t.index], t.value);
                        });
                    });
                },
                _onSelectChange: function () {
                    var t = this._getVariantFromOptions();
                    this.$container.trigger({ type: "variantChange", variant: t }),
                        t && (this._updateMasterSelect(t), this._updateImages(t), this._updatePrice(t), this._updateSKU(t), (this.currentVariant = t), this.enableHistoryState && this._updateHistoryState(t));
                },
                _updateImages: function (t) {
                    var e = t.featured_image || {},
                        i = this.currentVariant.featured_image || {};
                    t.featured_image && e.src !== i.src && this.$container.trigger({ type: "variantImageChange", variant: t });
                },
                _updatePrice: function (t) {
                    (t.price === this.currentVariant.price && t.compare_at_price === this.currentVariant.compare_at_price) || this.$container.trigger({ type: "variantPriceChange", variant: t });
                },
                _updateSKU: function (t) {
                    t.sku === this.currentVariant.sku || this.$container.trigger({ type: "variantSKUChange", variant: t });
                },
                _updateHistoryState: function (t) {
                    if (history.replaceState && t) {
                        var e = window.location.protocol + "//" + window.location.host + window.location.pathname + "?variant=" + t.id;
                        window.history.replaceState({ path: e }, "", e);
                    }
                },
                _updateMasterSelect: function (t) {
                    $(this.originalSelectorId, this.$container).val(t.id);
                },
            })),
            t
        );
    })()),
    (window.theme = window.theme || {}),
    (theme.Product = (function () {
        function t(t) {
            var e = (this.$container = $(t)),
                i = (this.sectionId = e.attr("data-section-id"));
            e.attr("data-section-type");
            (this.settings = {
                imageSize: null,
                namespace: ".product-page-section",
                sectionId: i,
                sliderActive: !1,
                swatch_color: e.attr("data-product_swatch_color"),
                swatch_size: e.attr("data-product_swatch_size"),
                variant_image_grouped: e.attr("data-variant_image_grouped"),
                swatch_color_advanced: e.attr("data-product_swatch_color_advanced"),
                product_design: e.attr("data-product_design"),
                product_image_count: e.data("product_image_count"),
            }),
                (this.selectors = {
                    product: "#ProductSection-" + i,
                    addToCart: "#AddToCart-" + i,
                    addToCartText: "#AddToCartText-" + i,
                    stockText: ".stock-" + i,
                    comparePrice: "#ComparePrice-" + i,
                    originalPrice: "#ProductPrice-" + i,
                    SKU: ".variant-sku",
                    originalPriceWrapper: ".product-price__price-" + i,
                    originalSelectorId: "#ProductSelect-" + i,
                    productFeaturedImage: ".FeaturedImage-" + i,
                    productImageWrap: "#FeaturedImageZoom-" + i,
                    productPrices: ".product-single__price-" + i,
                    productThumbImages: "#product-thumbnails-" + i,
                    productMainImages: "#product-images-" + i,
                    productPreviewMainImages: ".product-preview-images-" + i,
                    saleLabel: ".product-price__sale-label-" + i,
                    singleOptionSelector: ".single-option-selector-" + i,
                    singleOptionSelectorId: "#single-option-selector-" + i,
                    singleOptionSwatches: "wrapper-swatches-" + i,
                    instagramProduct: "#product-instagram-" + i,
                    instagramProductNameSpace: "product-instagram-" + i,
                    variationsSelector: "#variations-" + i,
                    variationSelector: ".variation-select-" + i,
                    qtyVariant: ".qty-variant-" + i,
                    threedId: ".threed-id-" + i,
                    countDownId: ".countdown-" + i,
                    couponCode: "#coupon-code-" + i,
                    couponBtn: "#coupon-btn-" + i,
                    sidebarSlide: ".sidebar-slick-vertical-" + i,
                    optionsSelect: "#single-option-selector-" + i,
                    stickCart: "#sticky-info-" + i,
                    cartAgree: "#product-cart__agree-" + i,
                    cartCheckout: "#product-buy__1click-" + i,
                    groupedProduct: "#products-grouped-" + i,
                    groupedButton: "#grouped-add-button-" + i,
                    groupedCheckbox: "#products-grouped-" + i + " .grouped-checkbox",
                }),
                $("#ProductJson-" + i).html() &&
                    ((this.productSingleObject = JSON.parse(document.getElementById("ProductJson-" + i).innerHTML)),
                    (this.productSwatchSingleObject = JSON.parse(document.getElementById("ProductSwatchJson-" + i).innerHTML)),
                    this._stringOverrides(),
                    this._initVariants(),
                    this._initSwatches(),
                    this._initFeature(),
                    this._initCompact(),
                    this._initStickyImages(),
                    this._initThumbnailsGallery(),
                    this._initImages(),
                    this._initSidebar(),
                    this._initZoom(),
                    this._initGallery(),
                    this._instagramProducts(),
                    this._initQuantity(),
                    this._initTabs(),
                    this._initHandleProduct(),
                    this._checkoutCart(),
                    "product-template" == i && this._initRelatedProducts(),
                    "product-template" == i && this._initViewedProducts(),
                    "product-template" == i && this._initUpsellProducts(),
                    "product-template" == i && this._initStickyInfo(),
                    "product-template" == i && this._initGroupedProduct());
        }
        return (
            (t.prototype = _.assignIn({}, t.prototype, {
                _stringOverrides: function () {
                    (theme.productStrings = theme.productStrings || {}), $.extend(theme.strings, theme.productStrings);
                },
                _initGroupedProduct: function () {
                    var t = $(this.selectors.groupedProduct);
                    0 == t.length ||
                        ($(document).on("change", this.selectors.groupedCheckbox, function () {
                            $(this).is(":checked") ? $($(this).data("id")).removeClass("hide") : $($(this).data("id")).addClass("hide"), roar.updateGroupedPrice();
                        }),
                        0 < $(this.selectors.groupedButton).length && $(this.selectors.groupedButton).unbind("click"),
                        $(document).on("click", this.selectors.groupedButton, function () {
                            var e = $(this);
                            return (
                                (Shopify.queue = []),
                                t.find(".grouped-checkbox").each(function () {
                                    if ($(this).is(":checked")) {
                                        var t = $($(this).data("id")).find("form .variation-select").val();
                                        null !== t && Shopify.queue.push({ variantId: t, quantity: 1 });
                                    }
                                }),
                                (Shopify.moveAlong = function () {
                                    if (Shopify.queue.length) {
                                        var t = Shopify.queue.shift();
                                        $.ajax({
                                            type: "POST",
                                            url: window.root_url + "/cart/add.js",
                                            async: !0,
                                            cache: !1,
                                            data: { quantity: t.quantity, id: t.variantId },
                                            dataType: "json",
                                            beforeSend: function () {
                                                e.addClass("loading");
                                            },
                                            complete: function () {
                                                roar.updateCart(e, !1);
                                            },
                                            error: function (t) {
                                                var e = $.parseJSON(t.responseText),
                                                    i = e.message + ": " + e.description;
                                                alert(i);
                                            },
                                            success: function () {
                                                Shopify.moveAlong();
                                            },
                                        });
                                    } else window.location.href = "window.root_url + '/cart'";
                                }),
                                Shopify.moveAlong(),
                                !1
                            );
                        }));
                },
                _initStickyInfo: function () {
                    if ($(this.selectors.stickCart).length) {
                        var t = this,
                            e = $("header").outerHeight() + $(".mini-breadcrumb").outerHeight() + $(".product-section-wrapper").offset().top;
                        $(window).scroll(function () {
                            var t = $(this).scrollTop();
                            t > e ? $("body").addClass("show-sticky-info-product") : $("body").removeClass("show-sticky-info-product"), t;
                        }),
                            $("body").on("click", ".sticky-button.button-cart", function () {
                                0 < $(t.selectors.addToCart).length && $(t.selectors.addToCart).trigger("click");
                            });
                    }
                },
                _checkoutCart: function () {
                    var t = this;
                    $(document).on("DOMNodeInserted", t.selectors.cartCheckout, function () {
                        var e = $(this);
                        setTimeout(function () {
                            var i = e.find(".shopify-payment-button__button");
                            i.length &&
                                (e.hide(),
                                setTimeout(function () {
                                    $(t.selectors.cartAgree).is(":checked") ? i.removeClass("btn-disabled") : i.addClass("btn-disabled"), e.fadeIn();
                                }, 300));
                        }, 0);
                    }),
                        $(document).on("change", t.selectors.cartAgree, function () {
                            var e = $(this),
                                i = $(t.selectors.cartCheckout).find(".shopify-payment-button__button");
                            e.is(":checked") ? i.removeClass("btn-disabled") : i.addClass("btn-disabled");
                        });
                },
                _initTabs: function () {
                    $("#tabs a").tabs();
                },
                _initHandleProduct: function () {
                    0 == $("#main").next("#popup-product-sizechart").length && $("#main").after($("#popup-product-sizechart")),
                        0 == $("#main").next("#popup-product-question").length && $("#main").after($("#popup-product-question")),
                        $(".button-product-question").click(function () {
                            $(this).data("question");
                            var t = $(this).data("_qid");
                            return (
                                $.magnificPopup.open({ items: { src: "#popup-product-question", type: "inline" }, tLoading: "", mainClass: "popup-module mfp-with-zoom", removalDelay: 200 }),
                                void (
                                    (0 < $(".quickview .mfp-content").find("#popup-product-question").length || 0 < $(".quickview .mfp-content").find("#popup-product-sizechart").length) &&
                                    ($(".quickview.mfp-wrap").addClass("_reopen"), $(".quickview.mfp-wrap").data("_qid", t))
                                )
                            );
                        }),
                        $(".button-product-sizechart").click(function () {
                            var t = $(this).data("sizechart"),
                                e = $(this).data("_qid");
                            return (
                                $.magnificPopup.open({ items: { src: t, type: "inline" }, tLoading: "", mainClass: "popup-module mfp-with-zoom", removalDelay: 200 }),
                                void (
                                    (0 < $(".quickview .mfp-content").find("#popup-product-sizechart").length || 0 < $(".quickview .mfp-content").find("#popup-product-question").length) &&
                                    ($(".quickview.mfp-wrap").addClass("_reopen"), $(".quickview.mfp-wrap").data("_qid", e))
                                )
                            );
                        }),
                        $(document).on("click", "#tabProduct a", function (t) {
                            t.preventDefault(), $(this).tab("show");
                        });
                },
                _initUpsellProducts: function () {
                    var t = "#upsellProducts .carousel-inner";
                    0 < $("#upsellProducts.carousel").length &&
                        $(t).slick({
                            arrows: !1,
                            slidesToShow: 4,
                            responsive: [
                                { breakpoint: 1200, settings: { slidesToShow: 4, slidesToScroll: 4 } },
                                { breakpoint: 768, settings: { slidesToShow: 4, slidesToScroll: 4 } },
                                { breakpoint: 550, settings: { slidesToShow: 2, slidesToScroll: 2 } },
                            ],
                            rtl: window.rtl,
                        }),
                        $("#upsellProduct_next").click(function () {
                            return $(t).slick("slickNext"), !1;
                        }),
                        $("#upsellProduct_prev").click(function () {
                            return $(t).slick("slickPrev"), !1;
                        }),
                        roar.initLazyLoading(t, !0);
                },
                _initRelatedProducts: function () {
                    var t = "#myCarouselRelated .carousel-inner";
                    0 < $("#myCarouselRelated.carousel").length &&
                        $(t).slick({
                            arrows: !1,
                            slidesToShow: 4,
                            responsive: [
                                { breakpoint: 1200, settings: { slidesToShow: 4, slidesToScroll: 4 } },
                                { breakpoint: 768, settings: { slidesToShow: 4, slidesToScroll: 4 } },
                                { breakpoint: 550, settings: { slidesToShow: 2, slidesToScroll: 2 } },
                            ],
                            rtl: window.rtl,
                        }),
                        $("#myCarouselRelated_next").click(function () {
                            return $(t).slick("slickNext"), !1;
                        }),
                        $("#myCarouselRelated_prev").click(function () {
                            return $(t).slick("slickPrev"), !1;
                        }),
                        roar.initLazyLoading(t, !0);
                },
                _initViewedProducts: function () {
                    var t = RoarCookie.cookie.rtread("rt-recent"),
                        e = $(".templateProduct #recently-viewed-products").data("handle"),
                        i = $(".templateProduct #recently-viewed-products").data("id"),
                        a = $(".templateProduct #recently-viewed-products").data("limit");
                    if (null != t) {
                        if (
                            (1 < (t = (t = t.split(",")).reverse()).length ? $("#recently-viewed-products").show() : t != e && $("#recently-viewed-products").show(),
                            $.ajax({
                                url: "/search?view=viewed&q=" + t + "_sp_" + i,
                                dataType: "html",
                                type: "GET",
                                success: function (t) {
                                    $("#recently-viewed-products").html(t), roar.initLazyLoading("#recently-viewed-products", !0), roar.initProductQuickShopItem("#recently-viewed-products");
                                },
                                error: function () {
                                    console.log("ajax error");
                                },
                                complete: function () {
                                    var t = $("#myCarouselViewed .carousel-inner");
                                    t.slick({
                                        arrows: !1,
                                        slidesToShow: 4,
                                        responsive: [
                                            { breakpoint: 1200, settings: { slidesToShow: 4, slidesToScroll: 4 } },
                                            { breakpoint: 768, settings: { slidesToShow: 4, slidesToScroll: 4 } },
                                            { breakpoint: 550, settings: { slidesToShow: 2, slidesToScroll: 2 } },
                                        ],
                                        rtl: window.rtl,
                                    }),
                                        $("#myCarouselViewed_next").click(function () {
                                            return t.slick("slickNext"), !1;
                                        }),
                                        $("#myCarouselViewed_prev").click(function () {
                                            return t.slick("slickPrev"), !1;
                                        }),
                                        roar.handleQuickshop("#recently-viewed-products");
                                },
                            }),
                            0 > t.indexOf(e))
                        ) {
                            t.length >= a && t.pop(), t.push(e);
                            try {
                                t = t.join(",");
                            } catch (t) {}
                        }
                    } else t = e;
                    RoarCookie.cookie.rtwrite("rt-recent", t);
                },
                _initImages: function () {
                    var t = this,
                        e = $(t.selectors.productMainImages),
                        i = !1;
                    if (
                        (1 == parseInt(window.rtl) && (i = !0),
                        "left" == this.settings.product_design ||
                            "bottom" == this.settings.product_design ||
                            "compact2" == this.settings.product_design ||
                            "split" == this.settings.product_design ||
                            "sidebar" == this.settings.product_design ||
                            "simple" == this.settings.product_design ||
                            "full-screen" == this.settings.product_design)
                    ) {
                        if (0 < $(t.selectors.productThumbImages).length) {
                            var a = $(t.selectors.productThumbImages).find(".thumbnails"),
                                n = "0" != $(t.selectors.productThumbImages).data("vertical"),
                                o = 6,
                                r = !1;
                            if (
                                (6 < this.settings.product_image_count ? ((o = 6), (r = !0)) : (o = this.settings.product_image_count - 1),
                                $(".product-page-section").hasClass("product-has-sidebar") && (3 < this.settings.product_image_count ? ((o = 3), (r = !0)) : (o = this.settings.product_image_count - 1)),
                                1 == r)
                            )
                                e
                                    .not(".slick-initialized")
                                    .slick({
                                        rtl: i,
                                        slidesToShow: 1,
                                        slidesToScroll: 1,
                                        infinite: !1,
                                        adaptiveHeight: !0,
                                        asNavFor: a,
                                        prevArrow: '<span class="fa fa-angle-left slick-prev-arrow"></span>',
                                        nextArrow: '<span class="fa fa-angle-right slick-next-arrow"></span>',
                                    }),
                                    a.not(".slick-initialized").slick({
                                        slidesToShow: o,
                                        slidesToScroll: 1,
                                        asNavFor: e,
                                        focusOnSelect: !0,
                                        vertical: n,
                                        infinite: !1,
                                        prevArrow: '<span class="fa fa-angle-up slick-prev-arrow"></span>',
                                        nextArrow: '<span class="fa fa-angle-down slick-next-arrow"></span>',
                                        responsive: [
                                            { breakpoint: 1024, settings: { slidesToShow: 3 } },
                                            { breakpoint: 992, settings: { slidesToShow: 3 } },
                                            { breakpoint: 768, settings: { slidesToShow: 3 } },
                                        ],
                                    });
                            else {
                                e.not(".slick-initialized").slick({
                                    rtl: i,
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                    infinite: !1,
                                    adaptiveHeight: !0,
                                    prevArrow: '<span class="fa fa-angle-left slick-prev-arrow"></span>',
                                    nextArrow: '<span class="fa fa-angle-right slick-next-arrow"></span>',
                                });
                                var s = this.settings.product_design,
                                    c = $(this.selectors.productFeaturedImage),
                                    l = $(this.selectors.productMainImages);
                                a.find(".thumbnails-item").on("click", function (t) {
                                    t.preventDefault();
                                    var e = $(this).data("href").replace("https:", "").replace("http:", "").split("?v=")[0];
                                    c.each(function () {
                                        var t = $(this);
                                        if (0 <= t.attr("href").indexOf(e) && !t.closest(".slick-slide").hasClass("slick-cloned")) {
                                            var i = t.closest(".slick-slide").attr("data-slick-index");
                                            "carousel" == s ? l.slick("slickGoTo", i) : l.slick("slickGoTo", i, !0);
                                        } else;
                                    }),
                                        a.find(".thumbnails-item").removeClass("current"),
                                        $(this).addClass("current");
                                }),
                                    l.on("beforeChange", function (t, e, i, n) {
                                        console.log(n), console.log(c);
                                        var o = $(c[n]).attr("href").replace("https:", "").replace("http:", "").split("?v=")[0];
                                        a.find(".thumbnails-item").each(function () {
                                            if (0 <= $(this).data("href").indexOf(o)) return a.find(".thumbnails-item").removeClass("current"), void $(this).addClass("current");
                                        });
                                    });
                            }
                        }
                    } else if ("carousel" == this.settings.product_design) {
                        var d = e.width() / 4;
                        e.not(".slick-initialized").slick({
                            rtl: i,
                            centerMode: !0,
                            centerPadding: d + "px",
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            adaptiveHeight: !0,
                            prevArrow: '<span class="fa fa-angle-left slick-prev-arrow"></span>',
                            nextArrow: '<span class="fa fa-angle-right slick-next-arrow"></span>',
                            responsive: [
                                { breakpoint: 1680, settings: { centerMode: !0, centerPadding: "400px", slidesToShow: 1 } },
                                { breakpoint: 1440, settings: { centerMode: !0, centerPadding: "350px", slidesToShow: 1 } },
                                { breakpoint: 1200, settings: { centerMode: !0, centerPadding: "300px", slidesToShow: 1 } },
                                { breakpoint: 1024, settings: { arrows: !1, centerMode: !0, centerPadding: "250px", slidesToShow: 1 } },
                                { breakpoint: 992, settings: { centerMode: !0, centerPadding: "200px", slidesToShow: 1 } },
                                { breakpoint: 768, settings: { arrows: !1, centerMode: !0, centerPadding: "125px", slidesToShow: 1 } },
                                { breakpoint: 480, settings: { arrows: !1, centerMode: !0, centerPadding: "50px", slidesToShow: 1 } },
                            ],
                        });
                    } else
                        e.not(".slick-initialized").slick({
                            rtl: i,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            infinite: !1,
                            adaptiveHeight: !0,
                            asNavFor: a,
                            prevArrow: '<span class="fa fa-angle-left slick-prev-arrow"></span>',
                            nextArrow: '<span class="fa fa-angle-right slick-next-arrow"></span>',
                        });
                    e.imagesLoaded(function () {
                        e.addClass("loaded");
                    });
                },
                _initThumbnailsGallery: function () {
                    var t = $(this.selectors.productMainImages);
                    "gallery" == this.settings.product_design &&
                        $(".thumbnail-gallery-item").on("click", function () {
                            var e = $(this);
                            e.hasClass("active") ||
                                ($(".thumbnail-gallery-item").removeClass("active"),
                                e.addClass("active"),
                                $(".thumbnail-gallery-item").each(function (i) {
                                    $(this).attr("id") != e.attr("id") || t.slick("slickGoTo", i, !0);
                                }));
                        });
                },
                _initQuantity: function () {
                    $(".q_up").unbind("click"),
                        $(".q_up").on("click", function () {
                            var t = $(this).data("product_id"),
                                e = parseInt($(".quantity-cart-" + t).val()) + 1;
                            $(".quantity-cart-" + t).val(e);
                        }),
                        $(".q_down").unbind("click"),
                        $(".q_down").on("click", function () {
                            var t = $(this).data("product_id"),
                                e = parseInt($(".quantity-cart-" + t).val());
                            1 < e && $(".quantity-cart-" + t).val(e - 1);
                        });
                },
                _initPopup: function () {
                    $(".sizechart-btn").magnificPopup({ type: "image", midClick: !0 }),
                        $(".return-btn").click(function () {
                            return $.magnificPopup.open({ items: { src: "#delivery-return", type: "inline" }, tLoading: "", mainClass: "popup-wrapper mfp-with-zoom", removalDelay: 200 }), !1;
                        });
                },
                _initFeature: function () {
                    if (
                        (0 < $(this.selectors.product + " .product-video-button a").length &&
                            $(this.selectors.product + " .product-video-button a").unbind("click") &&
                            $(this.selectors.product + " .product-video-button a").click(function (t) {
                                t.stopPropagation();
                                var e = $(this).data("video"),
                                    i = $(this).data("_qid");
                                $.magnificPopup.open({
                                    items: { src: e, type: "iframe" },
                                    type: "iframe",
                                    mainClass: "mfp-fade",
                                    removalDelay: 160,
                                    preloader: !1,
                                    disableOn: !1,
                                    fixedContentPos: !1,
                                    callbacks: {
                                        beforeClose: function () {
                                            console.log("Popup close has been initiated");
                                        },
                                    },
                                }),
                                    (0 < $(".quickview .mfp-content").find(".product-360-view-wrapper").length || 0 < $(".quickview .mfp-content").find(".mfp-iframe-scaler").length) &&
                                        ($(".quickview.mfp-wrap").addClass("_reopen"), $(".quickview.mfp-wrap").data("_qid", i));
                            }),
                        0 < $(this.selectors.product + " .product-360-button a").length)
                    ) {
                        for (
                            var t,
                                e = $(this.selectors.product + " .product-360-button a").data("id"),
                                i = $(this.selectors.product + " .product-360-button a").data("_qid"),
                                a = $(this.selectors.product + " .product-360-button a"),
                                n = [],
                                o = JSON.parse(document.getElementById("threed-id-" + this.sectionId).innerHTML),
                                r = 1;
                            72 >= r;
                            r++
                        )
                            o[(t = "f" + r)] && n.push(o[t]);
                        if (0 < n.length) {
                            var s = n.length;
                            $(this.selectors.threedId).ThreeSixty({
                                totalFrames: s,
                                endFrame: s,
                                currentFrame: 1,
                                imgList: ".threed-view-images",
                                progress: ".spinner",
                                imgArray: n,
                                height: null,
                                width: null,
                                responsive: !0,
                                navigation: !0,
                                onReady: function () {
                                    0 == $("#main").next(".product-360-view-wrapper").length && $("#main").after($(e)),
                                        a.unbind("click") &&
                                            a.click(function () {
                                                $.magnificPopup.open({
                                                    items: { src: e, type: "inline" },
                                                    type: "inline",
                                                    mainClass: "mfp-fade",
                                                    removalDelay: 160,
                                                    disableOn: !1,
                                                    preloader: !1,
                                                    fixedContentPos: !1,
                                                    callbacks: {
                                                        open: function () {
                                                            console.log("xx11"), $(window).resize();
                                                        },
                                                    },
                                                }),
                                                    $(window).resize(),
                                                    (0 < $(".quickview .mfp-content").find(".product-360-view-wrapper").length || 0 < $(".quickview .mfp-content").find(".mfp-iframe-scaler").length) &&
                                                        ($(".quickview.mfp-wrap").addClass("_reopen"), $(".quickview.mfp-wrap").data("_qid", i));
                                            });
                                },
                            });
                        }
                    }
                },
                _initCompact: function () {
                    0 < $(".product-accordions").length &&
                        $(".product-accordions .tab-heading").unbind("click") &&
                        $(".product-accordions .tab-heading").click(function (t) {
                            t.preventDefault();
                            var e = $(this),
                                i = e.closest(".product-accordion"),
                                a = e.closest(".product-accordions");
                            i.hasClass("active")
                                ? (i.removeClass("active"), i.find(".product-accordion-content").stop(!0, !0).slideUp())
                                : (a.find(".product-accordion").removeClass("active"), i.addClass("active"), a.find(".product-accordion-content").stop(!0, !0).slideUp(), i.find(".product-accordion-content").stop(!0, !0).slideDown());
                        });
                },
                _initStickyImages: function () {
                    $("body").hasClass("fastor-product-design-sticky") && $(".product-design-sticky .product-summary").stick_in_parent();
                },
                _instagramProducts: function () {
                    if (0 < $("#instagram_product").length) {
                        var t = $("#instagram_product").data("instagram_token"),
                            e = $("#instagram_product").data("user_id"),
                            i = $("#instagram_product").data("instagram_limit");
                        new Instafeed({
                            get: "user",
                            target: "instagram_product",
                            accessToken: t,
                            userId: e,
                            limit: i,
                            resolution: "thumbnail",
                            resolution2: "standard_resolution",
                            template: '<div class="wrap animated"><a target="_blank" href="{{link}}"><img src="{{image}}" alt="{{caption}}" width="150" height="150" /><span class="hover_border"></span></a></div>',
                        }).run();
                    }
                },
                _initGallery: function () {
                    !(function (t) {
                        for (
                            var e = function (t) {
                                    (t = t || window.event).preventDefault ? t.preventDefault() : (t.returnValue = !1);
                                    var e = (function t(e, i) {
                                        return e && (i(e) ? e : t(e.parentNode, i));
                                    })(t.target || t.srcElement, function (t) {
                                        return (e = "photoswipe-item"), -1 < (" " + t.className + " ").indexOf(" " + e + " ");
                                        var e;
                                    });
                                    if (e) {
                                        for (var a, n = e.closest(".photoswipe-wrapper"), o = $(e.closest(".photoswipe-wrapper")).find(".photoswipe-item").get(), r = o.length, s = 0, c = 0; c < r; c++)
                                            if (1 === o[c].nodeType) {
                                                if (o[c] === e) {
                                                    a = s;
                                                    break;
                                                }
                                                s++;
                                            }
                                        return 0 <= a && i(a, n), !1;
                                    }
                                },
                                i = function (t, e, i, a) {
                                    var n,
                                        o,
                                        r,
                                        s = document.querySelectorAll(".pswp")[0];
                                    if (
                                        ((r = (function (t) {
                                            for (var e, i, a, n, o = $(t).find(".photoswipe-item").get(), r = o.length, s = [], c = 0; c < r; c++)
                                                if (1 === (e = o[c]).nodeType)
                                                    if (((a = (i = e.children[0]).getAttribute("data-size").split("x")), "video" == $(i).data("type"))) {
                                                        var l = $($(i).data("id")).html();
                                                        s.push({ html: l });
                                                    } else
                                                        (n = { src: i.getAttribute("href"), w: parseInt(a[0], 10), h: parseInt(a[1], 10) }),
                                                            1 < e.children.length && (n.title = $(e).find(".caption").html()),
                                                            0 < i.children.length && (n.msrc = i.children[0].getAttribute("src")),
                                                            (n.el = e),
                                                            s.push(n);
                                            return s;
                                        })(e)),
                                        (o = { closeOnScroll: !1, galleryUID: e.getAttribute("data-pswp-uid") }),
                                        a)
                                    )
                                        if (o.galleryPIDs) {
                                            for (var c = 0; c < r.length; c++)
                                                if (r[c].pid == t) {
                                                    o.index = c;
                                                    break;
                                                }
                                        } else o.index = parseInt(t, 10) - 1;
                                    else o.index = parseInt(t, 10);
                                    isNaN(o.index) ||
                                        (i && (o.showAnimationDuration = 0),
                                        (n = new PhotoSwipe(s, PhotoSwipeUI_Default, r, o)).init(),
                                        n.listen("beforeChange", function () {
                                            var t = $(n.currItem.container);
                                            $(".pswp__video").removeClass("active"),
                                                t.find(".pswp__video").addClass("active"),
                                                $(".pswp__video").each(function () {
                                                    $(this).hasClass("active") || $(this).attr("src", $(this).attr("src"));
                                                });
                                        }),
                                        n.listen("close", function () {
                                            $(".pswp__video").each(function () {
                                                $(this).attr("src", $(this).attr("src"));
                                            }),
                                                $(".pswp__container .video-wrapper").empty();
                                        }));
                                },
                                a = document.querySelectorAll(t),
                                n = 0,
                                o = a.length;
                            n < o;
                            n++
                        )
                            a[n].setAttribute("data-pswp-uid", n + 1), (a[n].onclick = e);
                        var r = (function () {
                            var t = window.location.hash.substring(1),
                                e = {};
                            if (5 > t.length) return e;
                            for (var i = t.split("&"), a = 0; a < i.length; a++)
                                if (i[a]) {
                                    var n = i[a].split("=");
                                    2 > n.length || (e[n[0]] = n[1]);
                                }
                            return e.gid && (e.gid = parseInt(e.gid, 10)), e;
                        })();
                        r.pid && r.gid && i(r.pid, a[r.gid - 1], !0, !0);
                    })(this.selectors.product + " .photoswipe-wrapper");
                },
                _initZoom: function () {
                    if ($(".easyzoom").length)
                        if (1024 < $(window).width()) $(".easyzoom:not(.feature-video)").easyZoom({ loadingNotice: "", errorNotice: "", preventClicks: !1 }).data("easyZoom");
                        else
                            $(".easyzoom a").click(function (t) {
                                t.preventDefault();
                            });
                },
                _initSidebar: function () {
                    ($sidebarSlide = $(this.selectors.sidebarSlide)),
                        0 < $sidebarSlide.length &&
                            $sidebarSlide.each(function () {
                                var t = $(this),
                                    e = $(this).data("per_view");
                                $(this)
                                    .not(".slick-initialized")
                                    .slick({
                                        slidesToShow: e,
                                        slidesToScroll: 1,
                                        vertical: !0,
                                        focusOnSelect: !0,
                                        infinite: !1,
                                        prevArrow: '<span class="fa fa-angle-up slick-prev-arrow"></span>',
                                        nextArrow: '<span class="fa fa-angle-down slick-next-arrow"></span>',
                                    }),
                                    t.imagesLoaded(function () {
                                        t.addClass("loaded");
                                    });
                            });
                },
                _initForceHeight: function () {
                    0 < $(this.selectors.productPreviewMainImages).length &&
                        $(this.selectors.productPreviewMainImages)
                            .not(".slick-initialized")
                            .slick({ slidesToShow: 1, slidesToScroll: 1, infinite: !1, prevArrow: '<span class="fa fa-angle-left slick-prev-arrow"></span>', nextArrow: '<span class="fa fa-angle-right slick-next-arrow"></span>' });
                },
                _initSwatches: function () {
                    var t,
                        e,
                        a,
                        n,
                        o,
                        r = this.selectors.optionsSelect,
                        s = this.productSingleObject,
                        c = this.productSwatchSingleObject,
                        l = [];
                    if (("1" == this.settings.swatch_size && l.push("Size"), l.push("size"), "1" == this.settings.swatch_color && (l.push("Color"), l.push("Colour"), l.push("color"), l.push("colour")), 0 < l.length)) {
                        var d = !1,
                            u = 0,
                            h = theme.asset_url.substring(0, theme.asset_url.lastIndexOf("?")),
                            p = theme.asset_url.substring(theme.asset_url.lastIndexOf("?"), theme.asset_url.length);
                        for (i = 0; i < s.options.length; i++) {
                            var f = "",
                                m = "",
                                g = "",
                                v = "",
                                _ = "",
                                w = "",
                                y = "",
                                b = "img btooltip";
                            if (((f = "object" == typeof s.options[i] ? s.options[i].name : s.options[i]), (d = !1), !1, -1 < l.indexOf(f))) {
                                (d = !0), (u = i);
                                var k = f.toLowerCase();
                                if ((/color|colour/i.test(k) && !0, d)) {
                                    var C = [];
                                    for (j = 0; j < s.variants.length; j++) {
                                        var S = s.variants[j],
                                            x = this.htmlEntities(S.options[u]),
                                            T = this.convertToSlug(x);
                                        0 > C.indexOf(x) &&
                                            ("color" != k && "colour" != k
                                                ? ((y = x), (b = "btooltip"))
                                                : "1" == this.settings.swatch_color_advanced
                                                ? null !== c[T] && void 0 !== c[T] && "" != c[T]
                                                    ? ((b = "img btooltip swatch_color_advanced"), (y = '<i style="background-image: url(' + h + c[T] + ".png" + p + ')"></i>'))
                                                    : null === S.featured_image
                                                    ? (y = '<i style="background-color:' + x + "; background-image: url(" + h + T + ".png" + p + ')"></i>')
                                                    : ((b = "img btooltip swatch_color_advanced"),
                                                      (y =
                                                          '<i style="background-image: url(' +
                                                          ((t = S.featured_image.src),
                                                          (e = void 0),
                                                          (a = void 0),
                                                          (n = void 0),
                                                          (o = void 0),
                                                          (e = t.replace("https:", "").replace("http:", "").split("?v=")[0].split("/")),
                                                          (a = e[e.length - 1].split(".")),
                                                          (n = a.pop()),
                                                          (o = a.join(".") + "_100x." + n),
                                                          t.replace(e[e.length - 1], o)) +
                                                          ')"></i>'))
                                                : (y = '<i style="background-color:' + x + "; background-image: url(" + h + T + ".png" + p + ')"></i>'),
                                            (w = $(this.selectors.singleOptionSelectorId + "-" + u).val() == x ? "selected " : ""),
                                            (g =
                                                g +
                                                '<div class="swatch-element ' +
                                                k +
                                                T +
                                                ' available"><input data-id="' +
                                                this.selectors.singleOptionSelectorId +
                                                "-" +
                                                u +
                                                '" data-value="' +
                                                x +
                                                '"  class="swatch-radio ' +
                                                w +
                                                '" id="swatch-' +
                                                u +
                                                "-" +
                                                T +
                                                '" type="radio" data-swatch="' +
                                                k +
                                                '" data-poption="' +
                                                u +
                                                '" name="option-' +
                                                u +
                                                '" value="' +
                                                x +
                                                '"><label for="swatch-' +
                                                u +
                                                "-" +
                                                T +
                                                '" class="' +
                                                b +
                                                '" title="' +
                                                x +
                                                '"><span class="soldout-image"></span>' +
                                                y +
                                                "</label></div>"),
                                            C.push(x));
                                    }
                                    (m = '<div class="' + this.selectors.singleOptionSwatches + " wrapper-swatches swatch " + k + '" data-attribute_name="attribute_pa_' + k + '"><div>' + g + "</div></div>"),
                                        (v = $(this.selectors.singleOptionSelectorId + "-" + u)),
                                        (_ = $(this.selectors.variationSelector + "-" + u)),
                                        "" != m && (v.after(m), v.hide(), _.addClass("hide-choose-option"));
                                }
                            }
                        }
                    }
                    var I = "",
                        P = "." + this.selectors.singleOptionSwatches + " .swatch-radio",
                        z = this;
                    0 < $("." + this.selectors.singleOptionSwatches).length &&
                        ((I = $(P)).unbind("click"),
                        I.on("click", function () {
                            var t = $(this).data("id"),
                                e = $(this).data("poption"),
                                a = $(this).data("value"),
                                n = $(this).data("swatch");
                            $(this).data("value") != $(t).val() &&
                                ($(t).val($(this).data("value")).trigger("change"),
                                $(t).closest(".selector-wrapper").find(".swatch-radio").removeClass("selected"),
                                $(this).addClass("selected"),
                                $(t).closest(".selector-wrapper"),
                                $(t).closest(".selector-wrapper").find(".option-select-value").html($(this).data("value"))),
                                (function (t, e, a, n, o) {
                                    if (1 < t.options.length)
                                        for (i = 0; i < t.options.length; i++)
                                            i != e &&
                                                $(r + "-" + i + " option").each(function () {
                                                    var n = "unavailable",
                                                        o = $(this).attr("value");
                                                    for (j = 0; j < t.variants.length; j++) {
                                                        var r = t.variants[j];
                                                        if (r.options[e] == a && r.options[i] == o) {
                                                            n = 1 == r.available ? "available" : "sold_out";
                                                            break;
                                                        }
                                                    }
                                                    var s =
                                                        "#swatch-" +
                                                        i +
                                                        "-" +
                                                        o
                                                            .toLowerCase()
                                                            .replace(/[^a-z0-9 -]/g, "")
                                                            .replace(/\s+/g, "-")
                                                            .replace(/-+/g, "-");
                                                    $(s).closest(".swatch-element").removeClass("available").removeClass("sold_out").removeClass("unavailable").addClass(n);
                                                });
                                    else
                                        for (i = 0; i < t.options.length; i++)
                                            $("#single-option-selector-product-template-" + i + " option").each(function () {
                                                var e = "unavailable",
                                                    a = $(this).attr("value");
                                                for (j = 0; j < t.variants.length; j++)
                                                    if (t.variants[j].options[i] == a) {
                                                        e = t.variants[j].available ? "available" : "sold_out";
                                                        break;
                                                    }
                                                var n =
                                                    "#swatch-" +
                                                    i +
                                                    "-" +
                                                    a
                                                        .toLowerCase()
                                                        .replace(/[^a-z0-9 -]/g, "")
                                                        .replace(/\s+/g, "-")
                                                        .replace(/-+/g, "-");
                                                $(n).closest(".swatch-element").removeClass("available").removeClass("sold_out").removeClass("unavailable").addClass(e);
                                            });
                                    var s = o.settings.variant_image_grouped,
                                        c = o.selectors.productMainImages + ".slick-slider",
                                        l = o.selectors.productThumbImages + " .slick-slider",
                                        d = a,
                                        u = o.productSingleObject,
                                        h = o.selectors.originalSelectorId;
                                    if ("1" == s && ("color" == n || "colour" == n)) {
                                        $(l)
                                            .slick("slickUnfilter")
                                            .slick("slickFilter", "[data-color='" + d + "']");
                                        var p = $(l).find(".slick-slide"),
                                            f = 0,
                                            m = !1;
                                        p.each(function (t, e) {
                                            $(e).attr("data-slick-index", t),
                                                jQuery.each(u.variants, function (i, a) {
                                                    if (a.id == $(h).val() && 0 == m) {
                                                        var n = a.featured_image.src
                                                            .replace(/^https?\:/i, "")
                                                            .split("?")[0]
                                                            .replace(".png", "")
                                                            .replace(".jpg", "");
                                                        0 <= $(e).find("img").first().attr("src").indexOf(n) && ((f = t), (m = !0));
                                                    }
                                                });
                                        }),
                                            $(l).slick("slickGoTo", f, !0),
                                            $(c)
                                                .slick("slickUnfilter")
                                                .slick("slickFilter", "[data-color='" + d + "']"),
                                            (p = $(c).find(".slick-slide")),
                                            (f = 0),
                                            (m = !1),
                                            p.each(function (t, e) {
                                                $(e).attr("data-slick-index", t),
                                                    jQuery.each(u.variants, function (i, a) {
                                                        if (a.id == $(h).val() && 0 == m) {
                                                            var n = a.featured_image.src
                                                                .replace(/^https?\:/i, "")
                                                                .split("?")[0]
                                                                .replace(".png", "")
                                                                .replace(".jpg", "");
                                                            0 <= $(e).find("img").first().attr("src").indexOf(n) && ((f = t), (m = !0));
                                                        }
                                                    });
                                            }),
                                            $(c).slick("slickGoTo", f, !0),
                                            $(".templateProduct .thumbnails .slick-list").width() >= $(".templateProduct .thumbnails .slick-track").width()
                                                ? $("body").append('<style id="product-images-filtering-style" type="text/css">.templateProduct .thumbnails .slick-track{transform:none!important;}</style>')
                                                : 0 < $("style#product-images-filtering-style").length && $("style#product-images-filtering-style").remove();
                                    }
                                })(s, e, a, n, z);
                        })),
                        $(".swatch-radio.selected").trigger("click");
                },
                htmlEntities: function (t) {
                    return (t + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
                },
                convertToSlug: function (t) {
                    return t
                        .toLowerCase()
                        .replace(/[^a-z0-9 -]/g, "")
                        .replace(/\s+/g, "-")
                        .replace(/-+/g, "-");
                },
                _initVariants: function () {
                    var t = {
                        $container: this.$container,
                        enableHistoryState: this.$container.data("enable-history-state") || !1,
                        singleOptionSelector: this.selectors.singleOptionSelector,
                        originalSelectorId: this.selectors.originalSelectorId,
                        product: this.productSingleObject,
                    };
                    (this.variants = new slate.Variants(t)),
                        this.$container.on("variantChange" + this.settings.namespace, this._updateAddToCart.bind(this)),
                        this.$container.on("variantImageChange" + this.settings.namespace, this._updateImages.bind(this)),
                        this.$container.on("variantPriceChange" + this.settings.namespace, this._updatePrice.bind(this)),
                        this.$container.on("variantSKUChange" + this.settings.namespace, this._updateSKU.bind(this));
                },
                _updateAddToCart: function (t) {
                    var e = t.variant;
                    e
                        ? ($(this.selectors.productPrices).removeClass("invisible").attr("aria-hidden", "true"),
                          $(".variations_button").removeClass("hide"),
                          e.available
                              ? ($(this.selectors.addToCart).prop("disabled", !1).toggleClass("hide", !1),
                                $(this.selectors.addToCart).val(theme.strings.addToCart),
                                $(this.selectors.stockText).html(theme.strings.inStock).removeClass("out-of-stock unavailable").addClass("in-stock"),
                                "shopify" == e.inventory_management &&
                                    "continue" != e.inventory_policy &&
                                    (0 < e.inventory_quantity && 1 == parseInt(theme.inventory)
                                        ? $(this.selectors.stockText).html(e.inventory_quantity + " " + theme.strings.inStock)
                                        : $(this.selectors.stockText).html(theme.strings.inStock)))
                              : ($(this.selectors.addToCart).prop("disabled", !0).toggleClass("hide", !1),
                                $(this.selectors.addToCart).val(theme.strings.soldOut),
                                $(this.selectors.stockText).html(theme.strings.outStock).removeClass("in-stock unavailable").addClass("out-of-stock")))
                        : ($(".variations_button").addClass("hide"),
                          $(this.selectors.addToCart).prop("disabled", !0).toggleClass("hide", !0),
                          $(this.selectors.addToCart).val(theme.strings.unavailable),
                          $(this.selectors.stockText).html(theme.strings.unavailable).removeClass("in-stock").addClass("out-of-stock unavailable"),
                          $(this.selectors.productPrices).addClass("invisible").attr("aria-hidden", "false"));
                },
                _updateImages: function (t) {
                    var e = t.variant,
                        i = this,
                        a = this.settings.product_design,
                        n = e.featured_image.src.replace("https:", "").replace("http:", "").split("?v=")[0];
                    console.log(1),
                        $(this.selectors.productFeaturedImage).each(function () {
                            console.log(2);
                            var t = $(this);
                            if (0 <= t.attr("href").indexOf(n) && !t.closest(".slick-slide").hasClass("slick-cloned")) {
                                console.log(3);
                                var e = $(i.selectors.productMainImages),
                                    o = t.closest(".slick-slide").attr("data-slick-index");
                                if ((console.log("pos: " + o), "carousel" == a ? e.slick("slickGoTo", o) : (console.log(4), e.slick("slickGoTo", o, !0)), "scroll" == a)) {
                                    var r = parseInt(t.closest(".shopify-product-gallery__image").offset().top) - 50;
                                    $("html,body").animate({ scrollTop: r }, "slow");
                                }
                                "gallery" == a &&
                                    0 < $(".thumbnails .thumbnail-gallery-item").length &&
                                    $(".thumbnails .thumbnail-gallery-item").each(function () {
                                        0 <= $(this).data("href").indexOf(n) && $(this).trigger("click");
                                    });
                            } else;
                        });
                },
                _updatePrice: function (t) {
                    var e = t.variant;
                    if (($(this.selectors.originalPrice).html('<span class="money">' + theme.Currency.formatMoney(e.price, theme.settings.moneyFormat) + "</span>"), e.compare_at_price > e.price)) {
                        if (
                            ($(this.selectors.productPrices).addClass("has-sale"),
                            $(this.selectors.productPrices).removeClass("not-sale"),
                            $(this.selectors.comparePrice)
                                .html('<span class="money">' + theme.Currency.formatMoney(e.compare_at_price, theme.settings.moneyFormat) + "</span>")
                                .removeClass("hide"),
                            $(this.selectors.saleLabel).find("span").text(theme.strings.sale),
                            "" != theme.sale_percentages)
                        ) {
                            var i = Math.round((100 * (e.compare_at_price - e.price)) / e.compare_at_price);
                            $(this.selectors.saleLabel)
                                .find("span")
                                .text("-" + i + "%");
                        }
                        $(this.selectors.saleLabel).addClass("hide");
                    } else $(this.selectors.productPrices).removeClass("has-sale"), $(this.selectors.productPrices).addClass("not-sale"), $(this.selectors.comparePrice).addClass("hide"), $(this.selectors.saleLabel).addClass("hide");
                    theme.CurrencyPicker.convert(this.selectors.product + " .money");
                },
                _updateSKU: function (t) {
                    var e = t.variant;
                    "" == e.sku ? $(this.selectors.SKU).addClass("hide") : $(this.selectors.SKU).removeClass("hide").find(".sku").text(e.sku);
                  var vrquantity=inv_qty[ e.id ];
                  if (window.location.href.indexOf("/fr/") > -1) {
                     if(e.available)
                  {
                    $(".blob1").removeClass("notavail");
                  if(vrquantity > 10){
                  $("#product-stock-inventory1").text("Produit en stock");
                  }
                  else if(vrquantity < 11 && vrquantity > 1){
                    var quantxt=vrquantity+" produits en stock";
                  $("#product-stock-inventory1").text(quantxt);
                  }
                  else{
                      var quantxt="Seulement "+vrquantity+" produit restant";
                  $("#product-stock-inventory1").text(quantxt);
                  }
                  }
                  else{
                  $("#product-stock-inventory1").text("Rupture de stock");
                    $(".blob1").addClass("notavail");
                  }
                  }
                  else
                  {
                  if(e.available)
                  {
                    $(".blob1").removeClass("notavail");
                  if(vrquantity > 10){
                  $("#product-stock-inventory1").text("Product in stock");
                  }
                  else if(vrquantity < 11 && vrquantity > 1){
                    var quantxt=vrquantity+" products in stock";
                  $("#product-stock-inventory1").text(quantxt);
                  }
                  else{
                      var quantxt="Only "+vrquantity+" product remaining";
                  $("#product-stock-inventory1").text(quantxt);
                  }
                  }
                  else{
                  $("#product-stock-inventory1").text("Out of stock");
                    $(".blob1").addClass("notavail");
                  }
                  }
                },
                onUnload: function () {
                    this.$container.off(this.settings.namespace);
                },
            })),
            t
        );
    })()),
    (window.theme = window.theme || {}),
    (theme.Filters = (function () {
        function t(t) {
            var i = (this.$container = $(t));
            (this.$filterSelect = $(e.filter, i)),
                (this.$sortSelect = $(e.sortSelection, i)),
                (this.$viewSelect = $(e.defaultView, i)),
                (this.$filterClear = $(e.filterClear, i)),
                $(e.filter).length && ($(e.fiterTarget).html(""), $(e.filter).clone().appendTo(e.fiterTarget), $(".offcanvas_shop_sidebar").fitVids()),
                $(document).on("change", e.viewSelection, this._onViewChange.bind(this)),
                $(document).on("change", e.sortSelection, this._onSortChange.bind(this)),
                $(document).on("change", e.filterSelection, this._onFilterChange.bind(this)),
                $(document).on("click", e.filterClear, this._onFilterClear.bind(this));
        }
        var e = {
            sortSelection: ".filters-toolbar__input--sort",
            defaultSort: ".collection-header__default-sort",
            viewSelection: ".filters-toolbar__input--view",
            defaultView: ".collection-header__default-view",
            filter: ".shop-page #secondary",
            fiterTarget: ".offcanvas_aside_left .offcanvas_shop_sidebar .widget-area",
            filterSelection: ".mfilter-content .filter",
            filterClear: ".mfilter-content .clear",
        };
        return (
            (t.prototype = _.assignIn({}, t.prototype, {
                _filterAjaxClick: function (t) {
                    delete Shopify.queryParams.page;
                    var e = this._filterCreateUrl(t);
                    this._filterGetContent(e);
                },
                _filterCreateUrl: function (t) {
                    var e = $.param(Shopify.queryParams).replace(/%2B/g, "+");
                    return t ? ("" == e ? t : t + "?" + e) : location.pathname + "?" + e;
                },
                _filterGetContent: function (t) {
                    var e = "#mfilter-content-container",
                        i = ".mfilter-box .mfilter-content",
                        a = this;
                    $.ajax({
                        type: "get",
                        url: t,
                        beforeSend: function () {
                            roar.destroyCountdown(), $("body").addClass("is_loading").removeClass("open_filter");
                        },
                        success: function (n) {
                            var o = $(n).filter("title").text();
                            $(e).empty().html($(n).find(e).html()),
                                $(i).empty().html($(n).find(i).html()),
                                roar.mapPaginationCallback(),
                                History.pushState({ param: Shopify.queryParams }, o, t),
                                setTimeout(function () {
                                    $("html,body").animate({ scrollTop: $("body #sandbox").offset().top }, 500, "swing");
                                }, 100),
                                $("body").removeClass("is_loading"),
                                a._mapReviews();
                        },
                        error: function () {
                            $("body").removeClass("is_loading");
                        },
                    });
                },
                _mapReviews: function () {
                    "undefined" != typeof SPR && (SPR.registerCallbacks(), SPR.initRatingHandler(), SPR.initDomEls(), SPR.loadProducts(), SPR.loadBadges());
                },
                _onFilterClear: function (t) {
                    var e = [];
                    Shopify.queryParams.constraint && (e = Shopify.queryParams.constraint.split("+"));
                    var i = $(t.currentTarget).closest(".column").find("input:checked");
                    0 < i.length &&
                        i.each(function () {
                            var t = $(this).val();
                            if (t) {
                                var i = e.indexOf(t);
                                0 <= i && e.splice(i, 1);
                            }
                        }),
                        e.length ? (Shopify.queryParams.constraint = e.join("+")) : delete Shopify.queryParams.constraint,
                        this._filterAjaxClick();
                },
                _onViewChange: function (t) {
                    var i = $(t.currentTarget),
                        a = $(e.defaultView, this.$container).val(),
                        n = i.val() ? i.val() : a;
                    (Shopify.queryParams.view = n), this._filterAjaxClick();
                },
                _onSortChange: function (t) {
                    var i = $(t.currentTarget),
                        a = $(e.defaultSort, this.$container).val(),
                        n = i.val() ? i.val() : a;
                    (Shopify.queryParams.sort_by = n), this._filterAjaxClick();
                },
                _onFilterChange: function (t) {
                    var e = $(t.currentTarget),
                        i = e.closest(".column").attr("data-multi_choice"),
                        a = [];
                    if ((Shopify.queryParams.constraint && (a = Shopify.queryParams.constraint.split("+")), "false" == i && !e.closest(".field").hasClass("active"))) {
                        var n = e.closest(".column").find("input:checked");
                        0 < n.length &&
                            n.each(function () {
                                var t = $(this).val();
                                if (t) {
                                    var e = a.indexOf(t);
                                    0 <= e && a.splice(e, 1);
                                }
                            });
                    }
                    var o = e.val();
                    if (o) {
                        console.log(a);
                        var r = a.indexOf(o);
                        0 <= r ? (console.log(o), a.splice(r, 1)) : a.push(o);
                    }
                    a.length ? (Shopify.queryParams.constraint = a.join("+")) : delete Shopify.queryParams.constraint, this._filterAjaxClick();
                },
                onUnload: function () {
                    this.$sortSelect.off("change", this._onSortChange), this.$filterSelect.off("change", this._onFilterChange), this.$filterClear.off("click", this._onFilterClear);
                },
            })),
            t
        );
    })()),
    (theme.MegaMenuSection = (function () {
        function t(t) {
            var e = (this.$container = $(t)),
                i = e.attr("data-section-id");
            e.attr("data-section-type");
            (this.MegaMenu = $("#megamenu-" + i)),
                (this.megaMenuNamspace = "#megamenu-" + i),
                (this.megaMenuId = $("#shopify-section-" + i)),
                0 < $(".section-megamenu-content").length &&
                    $(".section-megamenu-content").each(function () {
                        var t = $(this).data("menu_width_class");
                        0 < $(this).closest(".shopify-section").length && (!$(this).closest(".shopify-section").hasClass(t) && $(this).closest(".shopify-section").addClass(t), $(this).closest(".shopify-section").removeClass("hidden"));
                    }),
                0 < $("#header-phantom .shopify-section").length &&
                    $("#header-phantom .shopify-section").each(function () {
                        $(this).removeClass("shopify-section");
                    }),
                this._init();
        }
        return (
            (t.prototype = _.assignIn({}, t.prototype, {
                _init: function () {
                    roar.fixedHeaderMenu(), this._products(), this._handleMegaMenu(), this._handleVermenuCategory();
                },
                _products: function () {
                    0 < $(".products-carousel-megamenu").length &&
                        $(".products-carousel-megamenu").each(function () {
                            var t = $(this).data("_id"),
                                e = ($(this).data("_one"), $(this).data("_two")),
                                i = $(this).data("_three"),
                                a = $(this).data("_four"),
                                n = $("#productsCarousel" + t);
                            n.not(".slick-initialized").slick({
                                arrows: !1,
                                slidesToShow: a,
                                slidesToScroll: a,
                                responsive: [
                                    { breakpoint: 1920, settings: { slidesToShow: a, slidesToScroll: a } },
                                    { breakpoint: 768, settings: { slidesToShow: i, slidesToScroll: i } },
                                    { breakpoint: 480, settings: { slidesToShow: e, slidesToScroll: e } },
                                ],
                                rtl: window.rtl,
                            }),
                                $(".productsCarousel" + t + "_next").click(function () {
                                    return n.slick("slickNext"), !1;
                                }),
                                $(".productsCarousel" + t + "_prev").click(function () {
                                    return n.slick("slickPrev"), !1;
                                }),
                                $(window).resize(function () {
                                    n.slick("setPosition");
                                });
                        });
                },
                _handleVermenuCategory: function () {
                    if ($("#vermenu_cat_gap").length && 992 <= roar.getWidthBrowser() && 0 < $(".container-megamenu.vertical .megamenu-wrapper").length) {
                        var t = $(".container-megamenu.vertical .megamenu-wrapper").outerHeight(),
                            e = $(".container-megamenu.vertical .megamenu-wrapper").offset().top,
                            i = $("#sidebar").offset().top;
                        $("#vermenu_cat_gap").css("height", t - (i - e));
                    }
                },
                _handleMegaMenu: function () {
                    this._handleVermenuCategory();
                    "yes" == window.megamenu_responsive_design && 992 > $(window).width() && (window.megamenu_responsive = !0),
                        $("ul.megamenu > li").each(function () {
                            var t = 0;
                            $(this)
                                .find(".mobile-enabled")
                                .each(function () {
                                    t++;
                                }),
                                0 == t && $(this).find(".open-menu").addClass("mobile-disabled");
                        }),
                        $("ul.megamenu li .sub-menu .content .hover-menu ul li").hover(
                            function () {
                                $(this).children("ul").addClass("active");
                            },
                            function () {
                                $(this).children("ul").removeClass("active");
                            }
                        ),
                        $(".close-categories").unbind("click"),
                        $(".close-categories").on("click", function () {
                            return $(this).parent().removeClass("active"), $(this).next().animate({ height: "hide" }, 400), !1;
                        }),
                        $(".open-categories").unbind("click"),
                        $(".open-categories").on("click", function () {
                            return (
                                $(".open-categories").parent().removeClass("active"),
                                $(".open-categories").next().next().animate({ height: "hide" }, 400),
                                $(this).parent().addClass("active"),
                                $(this).next().next().animate({ height: "show" }, 400),
                                !1
                            );
                        }),
                        $(".close-menu").unbind("click"),
                        $(".close-menu").on("click", function () {
                            return $(this).parent().removeClass("active"), $(this).next().next().next().animate({ height: "hide" }, 400), !1;
                        }),
                        $(".open-menu").unbind("click"),
                        $(".open-menu").on("click", function () {
                            return (
                                $("ul.megamenu > li").removeClass("active"),
                                $("ul.megamenu > li").find(".sub-menu").animate({ height: "hide" }, 400),
                                $(this).parent().addClass("active"),
                                $(this).next().next().animate({ height: "show" }, 400),
                                $(window).trigger("resize"),
                                (window.megamenu_responsive = !0),
                                !1
                            );
                        }),
                        $("ul.megamenu > li.click .content a").unbind("click"),
                        $("ul.megamenu > li.click .content a").click(function () {
                            window.location = $(this).attr("href");
                        }),
                        jQuery(window)
                            .resize(function () {
                                $("ul.megamenu > li.hover").hover(
                                    function () {
                                        if (0 == window.megamenu_responsive) {
                                            if (((window.megamenu_active = $(this)), (window.megamenu_hover = !0), $("ul.megamenu > li").removeClass("active"), $(this).addClass("active"), window.rtl)) {
                                                $(this).children(".sub-menu").css("right", "auto"), $(this).children(".sub-menu").css("left", "auto");
                                                var t = (e = $(this).children(".sub-menu")).offset().left;
                                                (a = (i = $(".horizontal ul.megamenu")).offset().left - 45) > t && $(this).children(".sub-menu").css("left", "0");
                                            } else {
                                                $(this).children(".sub-menu").css("right", "auto");
                                                var e = $(this).children(".sub-menu");
                                                t = $(window).width() - (e.offset().left + e.outerWidth());
                                                if ($(".header-type-3").length || $(".header-type-30").length)
                                                    var i = $("#top .container"),
                                                        a = $(window).width() - (i.offset().left + i.outerWidth());
                                                else (i = $(".overflow-megamenu")), (a = $(window).width() - (i.offset().left + i.outerWidth()));
                                                a > t && $(this).children(".sub-menu").css("right", "0");
                                            }
                                            var n = $(this).children("a").outerWidth() / 2,
                                                o = $(this).children("a").offset().left - $(this).find(".content").offset().left;
                                            $(this)
                                                .find(".content > .arrow")
                                                .css("left", o + n);
                                        }
                                    },
                                    function () {
                                        if (0 == window.megamenu_responsive) {
                                            var t = $(this).attr("title");
                                            if (((window.megamenu_hover = !1), "hover-intent" == t)) {
                                                var e = $(this);
                                                setTimeout(function () {
                                                    0 == window.megamenu_hover && $(e).removeClass("active");
                                                }, 500);
                                            } else $(this).removeClass("active");
                                        }
                                    }
                                );
                            })
                            .resize(),
                        $("ul.megamenu > li.click").unbind("click"),
                        $("ul.megamenu > li.click").click(function () {
                            if (1 == $(this).removeClass("active")) return !1;
                            if (
                                ((window.megamenu_active = $(this)),
                                (window.megamenu_hover = !0),
                                $("ul.megamenu > li").removeClass("active"),
                                $(this).addClass("active"),
                                1 == window.megamenu_responsive && $(this).children(".sub-menu").animate({ height: "show" }, 400),
                                window.rtl)
                            ) {
                                $(this).children(".sub-menu").css("right", "auto"), $(this).children(".sub-menu").css("left", "auto");
                                var t = (e = $(this).children(".sub-menu")).offset().left;
                                (a = (i = $(".horizontal ul.megamenu")).offset().left - 45) > t && $(this).children(".sub-menu").css("left", "0");
                            } else {
                                $(this).children(".sub-menu").css("right", "auto");
                                var e = $(this).children(".sub-menu");
                                t = $(window).width() - (e.offset().left + e.outerWidth());
                                if ($(".header-type-3").length)
                                    var i = $("#top .container"),
                                        a = $(window).width() - (i.offset().left + i.outerWidth());
                                else (i = $(".overflow-megamenu")), (a = $(window).width() - (i.offset().left + i.outerWidth()));
                                a > t && $(this).children(".sub-menu").css("right", "0");
                            }
                            var n = $(this).children("a").outerWidth() / 2,
                                o = $(this).children("a").offset().left - $(this).find(".content").offset().left;
                            return (
                                $(this)
                                    .find(".content > .arrow")
                                    .css("left", o + n),
                                !1
                            );
                        }),
                        $(".categories-image-right ul > li > a").hover(
                            function () {
                                $(this).closest(".categories-image-right").find("img").attr("src", $(this).attr("data-image"));
                            },
                            function () {
                                var t = $(this).closest(".categories-image-right").attr("data-image");
                                $(this).closest(".categories-image-right").find("img").attr("src", t);
                            }
                        ),
                        $(".megaMenuToggle").unbind("click"),
                        $(".megaMenuToggle").click(function () {
                            return (
                                1 == $(this).removeClass("active")
                                    ? $(this).parent().find(".megamenu-wrapper").stop(!0, !0).animate({ height: "hide" }, 400)
                                    : ($(this).parent().find(".megamenu-wrapper").stop(!0, !0).animate({ height: "toggle" }, 400), $(this).addClass("active")),
                                !1
                            );
                        }),
                        $("html").unbind("click"),
                        $("html").on("click", function () {
                            ("yes" == window.megamenu_responsive_design && 992 > $(window).width()) || $("ul.megamenu > li.click").removeClass("active");
                        }),
                        $(window).resize(function () {
                            (window.megamenu_responsive = !1), "yes" == window.megamenu_responsive_design && 992 > $(window).width() && (window.megamenu_responsive = !0);
                        }),
                        roar.initLazyLoading(".section-megamenu-content", !0);
                },
                onUnload: function () {
                    this.$container.off(this.megaMenuNamspace);
                },
                onSelect: function () {
                    0 < $(this.megaMenuNamspace + " .product-grid.rich-banner").length && roar.initCountdown(),
                        roar.initProductQuickShopItem(this.megaMenuNamspace + " .product-grid.rich-banner"),
                        roar.handleQuickshop(this.megaMenuNamspace + " .product-grid.rich-banner");
                },
                onBlockSelect: function () {},
                onBlockDeselect: function () {},
            })),
            t
        );
    })()),
    (theme.TopBlockSection = (function () {
        function t(t) {
            var e = (this.$container = $(t)),
                i = (this.sectionId = e.attr("data-section-id"));
            e.attr("data-section-type");
            (this.topBlockId = $("#shopify-section-" + i)), (this.topBlock = $("#top-block-" + i)), (this.topBlockNamspace = "#top-block-wrapper-" + i), this._init();
        }
        return (
            (t.prototype = _.assignIn({}, t.prototype, {
                _init: function () {},
                onUnload: function () {
                    this.$container.off(this.topBlockNamspace);
                },
            })),
            t
        );
    })()),
    (theme.CustomWidgetSection = (function () {
        function t(t) {
            var e = (this.$container = $(t)),
                i = (this.sectionId = e.attr("data-section-id"));
            e.attr("data-section-type");
            (this.customWidgetId = $("#shopify-section-" + i)), (this.customWidgetNamspace = "#custom-widget-" + i), (this.placement_fullwidth = $(this.customWidgetNamspace).data("placement_fullwidth")), this._init();
        }
        return (
            (t.prototype = _.assignIn({}, t.prototype, {
                _init: function () {
                    "1" != this.placement_fullwidth || window.sidebar || onFullWidthOption(this.sectionId);
                },
                onUnload: function () {
                    this.$container.off(this.customWidgetNamspace);
                },
            })),
            t
        );
    })()),
    (theme.BannerSection = (function () {
        function t(t) {
            var e = (this.$container = $(t)),
                i = (this.sectionId = e.attr("data-section-id"));
            e.attr("data-section-type");
            (this.bannerId = $("#shopify-section-" + i)),
                (this.bannerNamspace = "#rich-banners-" + i),
                (this.placement_fullwidth = $(this.bannerNamspace).data("placement_fullwidth")),
                (this.placement_background = $(this.bannerNamspace).data("placement_background")),
                this._init();
        }
        return (
            (t.prototype = _.assignIn({}, t.prototype, {
                _init: function () {
                    "1" != this.placement_fullwidth || window.sidebar || onFullWidthOption(this.sectionId);
                    this._initFx(), this._handleFontSize(), this._initSlider(), this._initTilt(), "1" == this.placement_background && this._initBackground();
                },
                _initBackground: function () {
                    var t = $("#shopify-section-" + this.sectionId),
                        e = this.$container.data("placement_background_c"),
                        i = this.$container.data("placement_background_i");
                    $(window)
                        .resize(function () {
                            if ((t.removeAttr("style"), !(768 > $(window).width()))) {
                                var a = t.offset();
                                t.width($("body").width()),
                                    t
                                        .css("left", "-" + a.left + "px")
                                        .css("padding-left", a.left)
                                        .css("padding-right", a.left),
                                    t
                                        .css("background-color", e)
                                        .css("background-image", "url(" + i + ")")
                                        .css("background-size", "cover");
                            }
                        })
                        .resize();
                },
                _initTilt: function () {
                    var t = this.$container.find(".rt-tilt-container");
                    0 >= t.length ||
                        (t.on("mousemove", function (t) {
                            const { left: e, top: i } = $(this).offset(),
                                a = t.pageX - e,
                                n = t.pageY - i,
                                o = $(this).width() / 2 - a,
                                r = $(this).height() / 2 - n;
                            $(this).css("transform", "perspective(500px) rotateX(" + r / 40 + "deg) rotateY(" + -o / 40 + "deg) translateZ(10px)"), Math.sign(o), Math.abs(o), $(this).removeClass("rt-leave");
                        }),
                        t.on("mouseleave", function () {
                            $(this).addClass("rt-leave");
                        }));
                },
                _initSlider: function () {
                    this.$container.find(".rich-banner--group.is-slider").each(function (t, e) {
                        var i = { interval: $(e).data("interval"), autoplay: $(e).data("autoplay"), itemsperslide: $(e).data("itemsperslide"), blockid: $(e).data("blockid"), variablewidth: $(e).data("variablewidth") },
                            a = $(e).not(".slick-initialized");
                        a.slick({
                            dots: !1,
                            arrows: !1,
                            slidesToShow: i.itemsperslide,
                            slidesToScroll: 1,
                            autoplay: i.autoplay,
                            autoplaySpeed: i.interval,
                            slide: "div, a.rich-banner-wrapper",
                            variableWidth: i.variablewidth,
                            centerMode: i.variablewidth,
                        }),
                            $(e)
                                .find(".next-button")
                                .first()
                                .click(function () {
                                    return a.slick("slickNext"), !1;
                                }),
                            $(e)
                                .find(".prev-button")
                                .first()
                                .click(function () {
                                    return a.slick("slickPrev"), !1;
                                }),
                            roar.initLazyLoading("#rich-banner--group" + i.blockid, !0);
                    });
                },
                _initFx: function () {
                    this.$container.find(".rich-banner.has-text-fx").each(function (t, e) {
                        var i = $(e).data("fx"),
                            a = $(e).data("fx-type");
                        1 == i &&
                            ("0" == a
                                ? anime
                                      .timeline({ loop: !0 })
                                      .add({
                                          targets: $(e).find(".rt-fx-dominos .letter").toArray(),
                                          rotateY: [-90, 0],
                                          duration: 1300,
                                          delay: function (t, e) {
                                              return 45 * e;
                                          },
                                      })
                                      .add({ targets: $(e).find(".rt-fx-dominos").toArray(), opacity: 0, duration: 1e3, easing: "easeOutExpo", delay: 1e3 })
                                : "1" == a
                                ? anime
                                      .timeline({ loop: !0 })
                                      .add({
                                          targets: $(e).find(".rt-fx-vertical-lines .letter").toArray(),
                                          scale: [0.3, 1],
                                          opacity: [0, 1],
                                          translateZ: 0,
                                          easing: "easeOutExpo",
                                          duration: 600,
                                          delay: function (t, e) {
                                              return 70 * (e + 1);
                                          },
                                      })
                                      .add({
                                          targets: $(e).find(".rt-fx-vertical-lines .line").toArray(),
                                          scaleX: [0, 1],
                                          opacity: [0.5, 1],
                                          easing: "easeOutExpo",
                                          duration: 700,
                                          offset: "-=875",
                                          delay: function (t, e, i) {
                                              return 80 * (i - e);
                                          },
                                      })
                                      .add({ targets: $(e).find(".rt-fx-vertical-lines").toArray(), opacity: 0, duration: 1e3, easing: "easeOutExpo", delay: 1e3 })
                                : "2" == a
                                ? anime
                                      .timeline({ loop: !0 })
                                      .add({
                                          targets: $(e).find(".rt-fx-fading .letter").toArray(),
                                          opacity: [0, 1],
                                          easing: "easeInOutQuad",
                                          duration: 2250,
                                          delay: function (t, e) {
                                              return 150 * (e + 1);
                                          },
                                      })
                                      .add({ targets: $(e).find(".rt-fx-fading").toArray(), opacity: 0, duration: 1e3, easing: "easeOutExpo", delay: 1e3 })
                                : "3" == a
                                ? anime
                                      .timeline({ loop: !0 })
                                      .add({
                                          targets: $(e).find(".rt-fx-intro .letter").toArray(),
                                          translateX: [40, 0],
                                          translateZ: 0,
                                          opacity: [0, 1],
                                          easing: "easeOutExpo",
                                          duration: 1200,
                                          delay: function (t, e) {
                                              return 500 + 30 * e;
                                          },
                                      })
                                      .add({
                                          targets: $(e).find(".rt-fx-intro .letter").toArray(),
                                          translateX: [0, -30],
                                          opacity: [1, 0],
                                          easing: "easeInExpo",
                                          duration: 1100,
                                          delay: function (t, e) {
                                              return 100 + 30 * e;
                                          },
                                      })
                                : "4" == a
                                ? anime
                                      .timeline({ loop: !0 })
                                      .add({
                                          targets: $(e).find(".rt-fx-surprising .word").toArray(),
                                          scale: [14, 1],
                                          opacity: [0, 1],
                                          easing: "easeOutCirc",
                                          duration: 800,
                                          delay: function (t, e) {
                                              return 800 * e;
                                          },
                                      })
                                      .add({ targets: $(e).find(".rt-fx-surprising").toArray(), opacity: 0, duration: 1e3, easing: "easeOutExpo", delay: 1e3 })
                                : anime
                                      .timeline({ loop: !0 })
                                      .add({ targets: $(e).find(".rt-fx-typing .line").toArray(), scaleY: [0, 1], opacity: [0.5, 1], easing: "easeOutExpo", duration: 700 })
                                      .add({ targets: $(e).find(".rt-fx-typing .line").toArray(), translateX: [0, $(e).find(".rt-fx-typing .letters").first().width()], easing: "easeOutExpo", duration: 700, delay: 100 })
                                      .add({
                                          targets: $(e).find(".rt-fx-typing .letter").toArray(),
                                          opacity: [0, 1],
                                          easing: "easeOutExpo",
                                          duration: 600,
                                          offset: "-=775",
                                          delay: function (t, e) {
                                              return 34 * (e + 1);
                                          },
                                      })
                                      .add({ targets: $(e).find(".rt-fx-typing").toArray(), opacity: 0, duration: 1e3, easing: "easeOutExpo", delay: 1e3 }));
                    });
                },
                _handleFontSize: function () {
                    var t = this.$container;
                    $(window)
                        .resize(function () {
                            var e = parseInt($(window).width());
                            t.find(".self-fontsize-adj").each(function () {
                                if (($(this).css("fontSize", $(this).data("oriFontsize")), 767 >= e)) {
                                    var t = parseInt($(this).data("oriFontsize")) / 2;
                                    (t = 10 > t ? 10 : t), $(this).css("fontSize", t + "px");
                                }
                            }),
                                t.find("a.self-fontsize-adj").each(function () {
                                    $(this).css("fontSize", $(this).data("oriFontsize"));
                                }),
                                767 >= e ? (t.find("a.self-fontsize-adj").css("fontSize", ""), t.find("a.self-fontsize-adj").css("padding", "7px 19px 5px")) : t.find("a.self-fontsize-adj").css("padding", "");
                        })
                        .resize();
                },
                onUnload: function () {
                    this.$container.off(this.bannerNamspace);
                },
                onBlockSelect: function (t) {
                    console.log(t);
                },
                onSelect: function () {
                    0 < $(this.bannerNamspace + " .product-grid.rich-banner").length && roar.initCountdown(),
                        roar.initLazyLoading(this.bannerNamspace + " .product-grid.rich-banner", !0),
                        roar.initProductQuickShopItem(this.bannerNamspace + " .product-grid.rich-banner"),
                        roar.handleQuickshop(this.bannerNamspace + " .product-grid.rich-banner");
                },
            })),
            t
        );
    })()),
    (theme.DeliveryBarSection = (function () {
        function t(t) {
            var e = (this.$container = $(t)),
                i = (this.sectionId = e.attr("data-section-id"));
            e.attr("data-section-type");
            (this.deliveryBarId = $("#shopify-section-" + i)),
                (this.deliveryBar = $("#delivery-bar-" + i)),
                (this.deliveryBarNamspace = "#delivery-bar-" + i),
                (this.placement_fullwidth = $(this.deliveryBarNamspace).data("placement_fullwidth")),
                this._init();
        }
        return (
            (t.prototype = _.assignIn({}, t.prototype, {
                _init: function () {
                    "1" != this.placement_fullwidth || window.sidebar || onFullWidthOption(this.sectionId);
                },
                onUnload: function () {
                    this.$container.off(this.deliveryBarNamspace);
                },
            })),
            t
        );
    })()),
    (theme.SlideShowSection = (function () {
        function t(t) {
            var e = (this.$container = $(t)),
                i = (this.sectionId = e.attr("data-section-id"));
            e.attr("data-section-type");
            (this.slideShowId = $("#shopify-section-" + i)),
                (this.slideShow = $("#home-slider-" + i)),
                (this.slideShowNamspace = "#home-slider-" + i),
                (this.option = {
                    slider_auto: this.slideShow.data("slider_auto"),
                    slider_interval: this.slideShow.data("slider_interval"),
                    slider_scale: this.slideShow.data("slider_scale"),
                    slider_auto_height: this.slideShow.data("slider_auto_height"),
                    slider_height: this.slideShow.data("slider_height"),
                    slider_align_top: this.slideShow.data("slider_align_top"),
                    is_header_slider: this.slideShow.data("is_header_slider"),
                    full_width: this.slideShow.data("full_width"),
                    is_megamenu: this.slideShow.data("is_megamenu"),
                }),
                this._init();
        }
        return (
            (t.prototype = _.assignIn({}, t.prototype, {
                _init: function () {
                    ("1" == this.option.is_header_slider && ("1" == this.option.slider_align_top ? $(".templateIndex").addClass("slider-align-top") : $(".templateIndex").removeClass("slider-align-top")),
                    this._handleSlideshow(),
                    this._initResize(),
                    "1" != this.option.full_width || window.sidebar) || onFullWidthOption(this.sectionId);
                    "1" == this.option.is_megamenu && this._handleMegaMenu();
                },
                _handleVermenuCategory: function () {
                    if ($("#vermenu_cat_gap").length && 992 <= roar.getWidthBrowser() && 0 < $(".container-megamenu.vertical .megamenu-wrapper").length) {
                        var t = $(".container-megamenu.vertical .megamenu-wrapper").outerHeight(),
                            e = $(".container-megamenu.vertical .megamenu-wrapper").offset().top,
                            i = $("#sidebar").offset().top;
                        $("#vermenu_cat_gap").css("height", t - (i - e));
                    }
                },
                _handleMegaMenu: function () {
                    this._handleVermenuCategory();
                    "yes" == window.megamenu_responsive_design && 992 > $(window).width() && (window.megamenu_responsive = !0),
                        $("ul.megamenu > li").each(function () {
                            var t = 0;
                            $(this)
                                .find(".mobile-enabled")
                                .each(function () {
                                    t++;
                                }),
                                0 == t && $(this).find(".open-menu").addClass("mobile-disabled");
                        }),
                        $("ul.megamenu li .sub-menu .content .hover-menu ul li").hover(
                            function () {
                                $(this).children("ul").addClass("active");
                            },
                            function () {
                                $(this).children("ul").removeClass("active");
                            }
                        ),
                        $(".close-categories").unbind("click"),
                        $(".close-categories").on("click", function () {
                            return $(this).parent().removeClass("active"), $(this).next().animate({ height: "hide" }, 400), !1;
                        }),
                        $(".open-categories").unbind("click"),
                        $(".open-categories").on("click", function () {
                            return (
                                $(".open-categories").parent().removeClass("active"),
                                $(".open-categories").next().next().animate({ height: "hide" }, 400),
                                $(this).parent().addClass("active"),
                                $(this).next().next().animate({ height: "show" }, 400),
                                !1
                            );
                        }),
                        $(".close-menu").unbind("click"),
                        $(".close-menu").on("click", function () {
                            return $(this).parent().removeClass("active"), $(this).next().next().next().animate({ height: "hide" }, 400), !1;
                        }),
                        $(".open-menu").unbind("click"),
                        $(".open-menu").on("click", function () {
                            return (
                                $("ul.megamenu > li").removeClass("active"),
                                $("ul.megamenu > li").find(".sub-menu").animate({ height: "hide" }, 400),
                                $(this).parent().addClass("active"),
                                $(this).next().next().animate({ height: "show" }, 400),
                                $(window).trigger("resize"),
                                (window.megamenu_responsive = !0),
                                !1
                            );
                        }),
                        $("ul.megamenu > li.click .content a").unbind("click"),
                        $("ul.megamenu > li.click .content a").click(function () {
                            window.location = $(this).attr("href");
                        }),
                        $("ul.megamenu > li.hover").hover(
                            function () {
                                if (0 == window.megamenu_responsive) {
                                    if (((window.megamenu_active = $(this)), (window.megamenu_hover = !0), $("ul.megamenu > li").removeClass("active"), $(this).addClass("active"), window.rtl)) {
                                        $(this).children(".sub-menu").css("right", "auto"), $(this).children(".sub-menu").css("left", "auto");
                                        var t = (e = $(this).children(".sub-menu")).offset().left;
                                        (a = (i = $(".horizontal ul.megamenu")).offset().left - 45) > t && $(this).children(".sub-menu").css("left", "0");
                                    } else {
                                        $(this).children(".sub-menu").css("right", "auto");
                                        var e = $(this).children(".sub-menu");
                                        t = $(window).width() - (e.offset().left + e.outerWidth());
                                        if ($(".header-type-3").length)
                                            var i = $("#top .container"),
                                                a = $(window).width() - (i.offset().left + i.outerWidth());
                                        else (i = $(".overflow-megamenu")), (a = $(window).width() - (i.offset().left + i.outerWidth()));
                                        a > t && $(this).children(".sub-menu").css("right", "0");
                                    }
                                    var n = $(this).children("a").outerWidth() / 2,
                                        o = $(this).children("a").offset().left - $(this).find(".content").offset().left;
                                    $(this)
                                        .find(".content > .arrow")
                                        .css("left", o + n);
                                }
                            },
                            function () {
                                if (0 == window.megamenu_responsive) {
                                    var t = $(this).attr("title");
                                    if (((window.megamenu_hover = !1), "hover-intent" == t)) {
                                        var e = $(this);
                                        setTimeout(function () {
                                            0 == window.megamenu_hover && $(e).removeClass("active");
                                        }, 500);
                                    } else $(this).removeClass("active");
                                }
                            }
                        ),
                        $("ul.megamenu > li.click").unbind("click"),
                        $("ul.megamenu > li.click").click(function () {
                            if (1 == $(this).removeClass("active")) return !1;
                            if (
                                ((window.megamenu_active = $(this)),
                                (window.megamenu_hover = !0),
                                $("ul.megamenu > li").removeClass("active"),
                                $(this).addClass("active"),
                                1 == window.megamenu_responsive && $(this).children(".sub-menu").animate({ height: "show" }, 400),
                                window.rtl)
                            ) {
                                $(this).children(".sub-menu").css("right", "auto"), $(this).children(".sub-menu").css("left", "auto");
                                var t = (e = $(this).children(".sub-menu")).offset().left;
                                (a = (i = $(".horizontal ul.megamenu")).offset().left - 45) > t && $(this).children(".sub-menu").css("left", "0");
                            } else {
                                $(this).children(".sub-menu").css("right", "auto");
                                var e = $(this).children(".sub-menu");
                                t = $(window).width() - (e.offset().left + e.outerWidth());
                                if ($(".header-type-3").length)
                                    var i = $("#top .container"),
                                        a = $(window).width() - (i.offset().left + i.outerWidth());
                                else (i = $(".overflow-megamenu")), (a = $(window).width() - (i.offset().left + i.outerWidth()));
                                a > t && $(this).children(".sub-menu").css("right", "0");
                            }
                            var n = $(this).children("a").outerWidth() / 2,
                                o = $(this).children("a").offset().left - $(this).find(".content").offset().left;
                            return (
                                $(this)
                                    .find(".content > .arrow")
                                    .css("left", o + n),
                                !1
                            );
                        }),
                        $(".categories-image-right ul > li > a").hover(
                            function () {
                                $(this).closest(".categories-image-right").find("img").attr("src", $(this).attr("data-image"));
                            },
                            function () {
                                var t = $(this).closest(".categories-image-right").attr("data-image");
                                $(this).closest(".categories-image-right").find("img").attr("src", t);
                            }
                        ),
                        $(".megaMenuToggle").unbind("click"),
                        $(".megaMenuToggle").click(function () {
                            return (
                                1 == $(this).removeClass("active")
                                    ? $(this).parent().find(".megamenu-wrapper").stop(!0, !0).animate({ height: "hide" }, 400)
                                    : ($(this).parent().find(".megamenu-wrapper").stop(!0, !0).animate({ height: "toggle" }, 400), $(this).addClass("active")),
                                !1
                            );
                        }),
                        $("html").unbind("click"),
                        $("html").on("click", function () {
                            ("yes" == window.megamenu_responsive_design && 992 > $(window).width()) || $("ul.megamenu > li.click").removeClass("active");
                        }),
                        $(window).resize(function () {
                            (window.megamenu_responsive = !1), "yes" == window.megamenu_responsive_design && 992 > $(window).width() && (window.megamenu_responsive = !0);
                        });
                },
                _handleSlideshow: function () {
                    var t, e, i, a, n, o, r, s;
                    if (this.slideShow.length) {
                        var c = this.slideShow;
                        (t = c.data("afx-head")), (e = c.data("afx-cap")), (i = c.data("afx-cta")), (a = c.data("afx-sticker")), (n = c.data("dfx-head")), (o = c.data("dfx-cap")), (r = c.data("dfx-cta")), (s = c.data("dfx-sticker"));
                    }
                    var l,
                        d = this.slideShowNamspace,
                        u = this.option.slider_auto,
                        h = this.option.slider_interval,
                        p = this.option.slider_scale,
                        f = this;
                    this.slideShow.length &&
                        ((l = this.slideShow.flexslider({
                            animation: "fade",
                            prevText: "",
                            nextText: "",
                            controlNav: !1,
                            directionNav: !1,
                            slideshowSpeed: h,
                            slideshow: u,
                            controlNav: !1,
                            start: function () {
                                jQuery("body").removeClass("loading"),
                                    jQuery(d + " ul.slides h2.caption-content").css("opacity", "0"),
                                    jQuery(d + " ul.slides .real-caption").css("opacity", "0"),
                                    jQuery(d + " ul.slides .caption-link").css("opacity", "0"),
                                    jQuery(d + " ul.slides .slide-sticker-wrapper img").css("opacity", "0"),
                                    jQuery(d + " ul.slides li:nth-child(1) h2.caption-content")
                                        .css("opacity", "1.0")
                                        .addClass("rt-animated " + t)
                                        .one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                                            $(this).removeClass("rt-animated " + t);
                                        }),
                                    jQuery(d + " ul.slides li:nth-child(1) .real-caption")
                                        .css("opacity", "1.0")
                                        .addClass("rt-animated " + e)
                                        .one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                                            $(this).removeClass("rt-animated " + e);
                                        }),
                                    jQuery(d + " ul.slides li:nth-child(1) .caption-link")
                                        .css("opacity", "1.0")
                                        .addClass("rt-animated " + i)
                                        .one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                                            $(this).removeClass("rt-animated " + i);
                                        }),
                                    jQuery(d + " ul.slides li:nth-child(1) .slide-sticker-wrapper img")
                                        .css("opacity", "1.0")
                                        .addClass("rt-animated " + a)
                                        .one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                                            $(this).removeClass("rt-animated " + a);
                                        });
                            },
                            after: function (n) {
                                var o = parseInt(n.currentSlide, 10) + 1;
                                jQuery(d + " ul.slides li:nth-child(" + o + ") h2.caption-content")
                                    .css("opacity", "1.0")
                                    .addClass("rt-animated " + t)
                                    .one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                                        $(this).removeClass("rt-animated " + t);
                                    }),
                                    jQuery(d + " ul.slides li:nth-child(" + o + ") .real-caption")
                                        .css("opacity", "1.0")
                                        .addClass("rt-animated " + e)
                                        .one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                                            $(this).removeClass("rt-animated " + e);
                                        }),
                                    jQuery(d + " ul.slides li:nth-child(" + o + ") .caption-link")
                                        .css("opacity", "1.0")
                                        .addClass("rt-animated " + i)
                                        .one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                                            $(this).removeClass("rt-animated " + i);
                                        }),
                                    jQuery(d + " ul.slides li:nth-child(" + o + ") .slide-sticker-wrapper img")
                                        .css("opacity", "1.0")
                                        .addClass("rt-animated " + a)
                                        .one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                                            $(this).removeClass("rt-animated " + a);
                                        });
                            },
                            before: function (t) {
                                var e = parseInt(t.currentSlide, 10) + 1;
                                jQuery(d + " ul.slides li:nth-child(" + e + ") h2.caption-content")
                                    .addClass("rt-animated " + n)
                                    .one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                                        $(this)
                                            .removeClass("rt-animated " + n)
                                            .css("opacity", "0");
                                    }),
                                    jQuery(d + " ul.slides li:nth-child(" + e + ") .real-caption")
                                        .addClass("rt-animated " + o)
                                        .one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                                            $(this)
                                                .removeClass("rt-animated " + o)
                                                .css("opacity", "0");
                                        }),
                                    jQuery(d + " ul.slides li:nth-child(" + e + ") .caption-link")
                                        .addClass("rt-animated " + r)
                                        .one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                                            $(this)
                                                .removeClass("rt-animated " + r)
                                                .css("opacity", "0");
                                        }),
                                    jQuery(d + " ul.slides li:nth-child(" + e + ") .slide-sticker-wrapper img")
                                        .addClass("rt-animated " + s)
                                        .one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                                            $(this)
                                                .removeClass("rt-animated " + s)
                                                .css("opacity", "0");
                                        });
                            },
                        })),
                        imagesLoaded(d, function () {
                            p ? f._mockupCaptionSlider2() : f._mockupCaptionSlider();
                        })),
                        this.slideShow.find(".flex-direction-nav .flex-next").click(function (t) {
                            return t.preventDefault(), t.stopPropagation(), l.flexslider("next"), !1;
                        }),
                        this.slideShow.find(".flex-direction-nav .flex-prev").click(function (t) {
                            return t.preventDefault(), t.stopPropagation(), l.flexslider("prev"), !1;
                        });
                },
                _mockupCaptionSlider2: function () {
                    if (this.slideShow.length) {
                        var t = this.slideShowNamspace,
                            e = roar.getWidthBrowser();
                        $(t + " .slide-body").each(
                            1200 > e
                                ? function () {
                                      var t = $(this).data("height");
                                      $(this).css({ height: (t * e) / 1200 });
                                  }
                                : function () {
                                      var t = $(this).data("height");
                                      $(this).css({ height: t });
                                  }
                        ),
                            $(t + " .caption-content").each(
                                1200 > e
                                    ? function () {
                                          var t = $(this).data("min"),
                                              i = ($(this).data("max") * e) / 1200;
                                          t > i && (i = t), $(this).css({ "font-size": i });
                                      }
                                    : function () {
                                          var t = $(this).data("max");
                                          $(this).css({ "font-size": t });
                                      }
                            );
                    }
                },
                _mockupCaptionSlider: function () {
                    if (this.slideShow.length) {
                        var t = this.slideShowNamspace,
                            e = this.option.slider_auto_height,
                            i = this.option.slider_height,
                            a = roar.getWidthBrowser();
                        767 > a && 0 == e && 0 < i && $(t + " .slide-body").css("height", (i * a) / 1200),
                            767 <= a && 0 == e && 0 < i && $(t + " .slide-body").css("height", i),
                            $(t + " .caption-content").each(
                                767 > a
                                    ? function () {
                                          var t = $(this).data("min"),
                                              e = $(this).data("max"),
                                              i = e;
                                          50 < e && (i = 50), t > i && (i = t), $(this).css({ "font-size": i });
                                      }
                                    : function () {
                                          var t = $(this).data("max");
                                          $(this).css({ "font-size": t });
                                      }
                            );
                    }
                },
                _initResize: function () {
                    var t = this.option.slider_scale,
                        e = this;
                    jQuery(window).resize(function () {
                        t ? e._mockupCaptionSlider2() : e._mockupCaptionSlider();
                    });
                },
                onUnload: function () {
                    this.$container.off(this.slideShowNamspace);
                },
            })),
            t
        );
    })()),
    (theme.SidebarSection = (function () {
        function t(t) {
            var e = (this.$container = $(t)),
                i = (this.sectionId = e.attr("data-section-id"));
            e.attr("data-section-type");
            (this.sideBarId = $("#shopify-section-" + i)),
                (this.sideBar = $("#sidebar-" + i)),
                (this.sideBarNamspace = "#sidebar-" + i),
                (this.tabSideBar = $(".tab-filter-tabs" + i + " a")),
                (this.tabItem = $(".procduct_tab_item-" + i)),
                this._init();
        }
        return (
            (t.prototype = _.assignIn({}, t.prototype, {
                _init: function () {
                    var t = this;
                    0 < this.tabItem.length &&
                        this.tabItem.each(function () {
                            var e = { _tabcount: $(this).data("_tabcount"), _ptab_carousel: $(this).data("_ptab_carousel"), _id: $(this).data("_id") };
                            0 < parseInt(e._tabcount) ? (t._initTab(), e._ptab_carousel && t._initMultiSlide(e), t._initMultiSlides(e)) : (e._ptab_carousel && t._initSlide(e), t._initSlides(e));
                        });
                },
                _initTab: function () {
                    this.tabSideBar.each(function () {
                        $(this).click(function (t) {
                            t.preventDefault(), $(this).tab("show");
                        });
                    });
                },
                _initSlide: function (t) {
                    var e = $(".box #myCarousel" + t._id + " .carousel-inner");
                    $("#myCarousel" + t._id + "_next").click(function () {
                        return e.trigger("next.owl.carousel"), !1;
                    }),
                        $("#myCarousel" + t._id + "_prev").click(function () {
                            return e.trigger("prev.owl.carousel"), !1;
                        }),
                        e.owlCarousel({ slideSpeed: 500, items: 1, rtl: window.rtl });
                },
                _initSlides: function (t) {
                    var e = $(".box #myCarousel" + t._id + "s .carousel-inner");
                    e.owlCarousel({ slideSpeed: 500, rtl: window.rtl, responsive: { 0: { items: 1 }, 320: { items: 1 }, 479: { items: 1 }, 767: { items: 1 }, 979: { items: 1 }, 1199: { items: 1 } } }),
                        $("#myCarousel" + t._id + "s_next").click(function () {
                            return e.trigger("next.owl.carousel"), !1;
                        }),
                        $("#myCarousel" + t._id + "s_prev").click(function () {
                            return e.trigger("prev.owl.carousel"), !1;
                        });
                },
                _initMultiSlide: function (t) {
                    var e = $(".filter-product #myCarousel" + t._id + " .carousel-inner");
                    $("#myCarousel" + t._id + "_next").click(function () {
                        return e.trigger("next.owl.carousel"), !1;
                    }),
                        $("#myCarousel" + t._id + "_prev").click(function () {
                            return e.trigger("prev.owl.carousel"), !1;
                        }),
                        e.owlCarousel({ slideSpeed: 500, items: 1, rtl: window.rtl });
                },
                _initMultiSlides: function (t) {
                    var e = $(".filter-product #myCarousel" + t._id + "s .carousel-inner");
                    $("#myCarousel" + t._id + "s_next").click(function () {
                        return e.trigger("next.owl.carousel"), !1;
                    }),
                        $("#myCarousel" + t._id + "s_prev").click(function () {
                            return e.trigger("prev.owl.carousel"), !1;
                        }),
                        e.owlCarousel({ slideSpeed: 500, rtl: window.rtl, responsive: { 0: { items: 1 }, 320: { items: 1 }, 479: { items: 1 }, 767: { items: 1 }, 979: { items: 1 }, 1199: { items: 1 } } });
                },
                onUnload: function () {
                    this.$container.off(this.sideBarNamspace);
                },
            })),
            t
        );
    })()),
    (theme.ProductTabSection = (function () {
        function t(t) {
            var e = (this.$container = $(t)),
                i = (this.sectionId = e.attr("data-section-id"));
            e.attr("data-section-type");
            (this.productTabId = $("#shopify-section-" + i)),
                (this.productTab = $("#product-tab-" + i)),
                (this.productTabNamspace = "#product-tab-" + i),
                (this.tabProductTabVertical = $(".tab-filter-tabs-vertical-" + i + " a")),
                (this.tabProductTab = $(".tab-filter-tabs-" + i + " a")),
                (this.tabItem = $(".product-tab-item-" + i)),
                (this._tabcount = this.productTab.data("_tabcount")),
                (this.placement_fullwidth = this.productTab.data("placement_fullwidth")),
                this._init();
        }
        return (
            (t.prototype = _.assignIn({}, t.prototype, {
                _init: function () {
                    var t = this,
                        e = this._tabcount;
                    (0 < this.tabItem.length &&
                        this.tabItem.each(function () {
                            var i = {
                                _tabcount: e,
                                _ptab_carousel: $(this).data("_ptab_carousel"),
                                _id: $(this).data("_id"),
                                _nextpage: $(this).data("_nextpage"),
                                _itemsperpage: $(this).data("_itemsperpage"),
                                _limit: parseInt($(this).data("_limit"), 10),
                                _colclass: $(this).data("_colclass"),
                                _catid: $(this).data("_catid"),
                                _all_loaded: !1,
                                _loaded_count: parseInt($(this).data("_itemsperpage"), 10),
                            };
                            t._initTab(), t._initMultiSlide(i);
                        }),
                    "1" != this.placement_fullwidth || window.sidebar) || onFullWidthOption(this.sectionId);
                },
                _initTab: function () {
                    0 < this.tabProductTab.length &&
                        this.tabProductTab.each(function () {
                            $(this).click(function (t) {
                                t.preventDefault(), $(this).tab("show");
                            });
                        }),
                        0 < this.tabProductTabVertical.length &&
                            this.tabProductTabVertical.each(function () {
                                $(this).click(function (t) {
                                    t.preventDefault(), $(this).tab("show");
                                });
                            });
                },
                _initMultiSlide: function (t) {
                    var e = 1,
                        i = 0;
                    if (t._ptab_carousel) {
                        var a = $(".filter-product #myCarousel" + t._id),
                            n = $(".filter-product #myCarousel" + t._id + " .carousel-inner");
                        n.slick({ autoplaySpeed: 500, rtl: window.rtl, slidesToShow: 1, arrows: !1, infinite: !1 }),
                            n.on("reInit ", function (t, i) {
                                e = i.slideCount;
                            }),
                            n.on("afterChange", function (t, e) {
                                i = e.currentSlide;
                            }),
                            $("#myCarousel" + t._id + "_next").click(function () {
                          console.log('clicked');
                                return e == i + 1 && "" != t._catid && 0 == t._all_loaded && t._loaded_count < t._limit
                                    ? (console.log("There we go..."),
                                      a.addClass("b-loading"),
                                      $.ajax({
                                          url: window.root_url + "/collections/" + t._catid,
                                          type: "get",
                                          dataType: "html",
                                          data: { view: "customlim", limit: t._itemsperpage + "a" + t._colclass, page: t._nextpage },
                                          success: function (e) {
                                              var i = e.trim();
                                              if ("" == i) t._all_loaded = !0;
                                              else {
                                                  var o = $(i),
                                                      r = "row-" + t._id + "-" + t._nextpage,
                                                      s = o.find(".row").first().attr("id", r).children();
                                                  if (t._loaded_count + s.length <= t._limit) ++t._nextpage, (t._loaded_count += s.length);
                                                  else {
                                                      for (var c = t._loaded_count + s.length - t._limit, l = 0; l < c; l++) s.last().remove(), (s = o.find(".row").first().children());
                                                      t._loaded_count = t._limit;
                                                  }
                                                  n.slick("slickAdd", o[0].outerHTML),
                                                      n.slick("slickNext"),
                                                      roar.initCountdown(),
                                                      roar.initLazyLoading("#" + r, !0),
                                                      roar.initProductQuickShopItem("#" + r),
                                                      roar.handleQuickshop("#" + r),
                                                      window.show_multiple_currencies && theme.CurrencyPicker.convert("#sandbox .money");
                                              }
                                              a.removeClass("b-loading");
                                          },
                                          error: function () {
                                              console.log("Something went wrong");
                                          },
                                      }),
                                      !1)
                                    : (n.slick("slickNext"), !1);
                            }),
                            $("#myCarousel" + t._id + "_prev").click(function () {
                                return n.slick("slickPrev"), !1;
                            });
                    }
                },
                onUnload: function () {
                    this.$container.off(this.productTabNamspace);
                },
            })),
            t
        );
    })()),
    (theme.AdvancedGridSection = (function () {
        function t(t) {
            var e = (this.$container = $(t)),
                i = (this.sectionId = e.attr("data-section-id"));
            e.attr("data-section-type");
            (this.advancedGridId = $("#shopify-section-" + i)),
                (this.advancedGrid = $("#advanced-grid-" + i)),
                (this.advancedGridNamspace = "#advanced-grid-" + i),
                (this._ag_bgtype = this.advancedGrid.data("_ag_bgtype")),
                (this._ag_fullwidth = this.advancedGrid.data("_ag_fullwidth")),
                (this._agProductsCarousel = $(".myProductsCarousel-" + i)),
                this._init();
        }
        return (
            (t.prototype = _.assignIn({}, t.prototype, {
                _init: function () {
                    this._ag_fullwidth && !window.sidebar && onFullWidthOption(this.sectionId);
                    "2" == this._ag_bgtype && this._initParalax(), this._initProductTab(), this._initProductsSlide(), this._initCountdown();
                },
                _initCountdown: function () {
                    0 < $(".ag_product_countdown").length &&
                        $(".ag_product_countdown").each(function () {
                            var t = parseInt($(this).data("offer_date_year")),
                                e = parseInt($(this).data("offer_date_month")),
                                i = parseInt($(this).data("offer_date_day")),
                                a = new Date(),
                                n = new Date(t, e - 1, i);
                            a < n ? $(this).countdown({ until: n }) : $(this).hide();
                        });
                },
                _initParalax: function () {
                    var t = this.sectionId;
                    $(".advanced-grid-" + t + " .parallax-window").scrolly({ bgParallax: !0 });
                },
                _initProductsSlide: function () {
                    0 < this._agProductsCarousel.length &&
                        this._agProductsCarousel.each(function () {
                            var t = $(this),
                                e = t.data("_skin_type"),
                                i = t.data("_id");
                            "sportwinter" == e
                                ? t.owlCarousel({ slideSpeed: 500, items: 1, rtl: window.rtl })
                                : t.owlCarousel({ responsive: { 0: { items: window.pitem_row }, 320: { items: window.pitem_row }, 479: { items: 2 }, 767: { items: 3 }, 979: { items: 4 }, 1199: { items: 5 } }, rtl: window.rtl }),
                                $("#myCarousel" + i + "_next").click(function () {
                                    return t.trigger("next.owl.carousel"), !1;
                                }),
                                $("#myCarousel" + i + "_prev").click(function () {
                                    return t.trigger("prev.owl.carousel"), !1;
                                });
                        });
                },
                _initProductTab: function () {
                    var t = this.sectionId,
                        e = this;
                    $(".ag-products-tabs-" + t).each(function () {
                        $(this).data("_tabcount");
                        var t = $(this).data("_block_id");
                        e._initTab(t), e._initMultiSlide(t);
                    });
                },
                _initTab: function (t) {
                    0 < $(".tab-filter-tabs-" + t).length &&
                        $(".tab-filter-tabs-" + t + " a").each(function () {
                            $(this).click(function (t) {
                                t.preventDefault(), $(this).tab("show");
                            });
                        });
                },
                _initMultiSlide: function (t) {
                    0 < $(".ag-product-tab-item-" + t).length &&
                        $(".ag-product-tab-item-" + t).each(function () {
                            var t = $(this).data("_pid"),
                                e = $(this).data("_acm_carousel"),
                                i = $(this).data("_catid"),
                                a = $(this).data("_nextpage"),
                                n = $(this).data("_itemsperpage"),
                                o = parseInt($(this).data("_limit"), 10),
                                r = $(this).data("_colclass"),
                                s = !1,
                                c = parseInt($(this).data("_itemsperpage"), 10),
                                l = 1,
                                d = 0;
                            if (e) {
                                var u = $(".filter-product #myCarousel" + t),
                                    h = $(".filter-product #myCarousel" + t + " .carousel-inner");
                                h.slick({ autoplaySpeed: 500, rtl: window.rtl, slidesToShow: 1, arrows: !1, infinite: !1 }),
                                    h.on("reInit ", function (t, e) {
                                        l = e.slideCount;
                                    }),
                                    h.on("afterChange", function (t, e) {
                                        d = e.currentSlide;
                                    }),
                                    $("#myCarousel" + t + "_next").click(function () {
                                        return l == d + 1 && "" != i && 0 == s && c < o
                                            ? (u.addClass("b-loading"),
                                              $.ajax({
                                                  url: window.root_url + "/collections/" + i,
                                                  type: "get",
                                                  dataType: "html",
                                                  data: { view: "customlim", limit: n + "a" + r, page: a },
                                                  success: function (e) {
                                                      var i = e.trim();
                                                      if ("" == i) s = !0;
                                                      else {
                                                          var n = $(i),
                                                              r = "row-" + t + "-" + a,
                                                              l = n.find(".row").first().attr("id", r).children();
                                                          if (c + l.length <= o) ++a, (c += l.length);
                                                          else {
                                                              for (var d = c + l.length - o, p = 0; p < d; p++) l.last().remove(), (l = n.find(".row").first().children());
                                                              c = o;
                                                          }
                                                          h.slick("slickAdd", n[0].outerHTML),
                                                              h.slick("slickNext"),
                                                              roar.initCountdown(),
                                                              roar.initLazyLoading("#" + r, !0),
                                                              roar.initProductQuickShopItem("#" + r),
                                                              roar.handleQuickshop("#" + r),
                                                              window.show_multiple_currencies && theme.CurrencyPicker.convert("#sandbox .money");
                                                      }
                                                      u.removeClass("b-loading");
                                                  },
                                                  error: function () {
                                                      console.log("Something went wrong");
                                                  },
                                              }),
                                              !1)
                                            : (h.slick("slickNext"), !1);
                                    }),
                                    $("#myCarousel" + t + "_prev").click(function () {
                                        return h.slick("slickPrev"), !1;
                                    });
                            }
                        });
                },
                onUnload: function () {
                    this.$container.off(this.advancedGridNamspace);
                },
            })),
            t
        );
    })()),
    (theme.PrefaceFooterSection = (function () {
        function t(t) {
            var e = (this.$container = $(t)),
                i = (this.sectionId = e.attr("data-section-id"));
            e.attr("data-section-type");
            (this.prefaceFooterId = $("#shopify-section-" + i)), (this.prefaceFooter = $("#preface-footer-" + i)), (this.prefaceFooterNamspace = "#preface-footer-" + i), this._init();
        }
        return (
            (t.prototype = _.assignIn({}, t.prototype, {
                _init: function () {},
                onUnload: function () {
                    this.$container.off(this.prefaceFooterNamspace);
                },
            })),
            t
        );
    })()),
    (theme.FooterTopSection = (function () {
        function t(t) {
            var e = (this.$container = $(t)),
                i = (this.sectionId = e.attr("data-section-id"));
            e.attr("data-section-type");
            (this.footerTopId = $("#shopify-section-" + i)), (this.footerTop = $("#footer-top-" + i)), (this.footerTopNamspace = "#footer-top-" + i), this._init();
        }
        return (
            (t.prototype = _.assignIn({}, t.prototype, {
                _init: function () {},
                onUnload: function () {
                    this.$container.off(this.footerTopNamspace);
                },
            })),
            t
        );
    })()),
    (theme.FooterBottomSection = (function () {
        function t(t) {
            var e = (this.$container = $(t)),
                i = (this.sectionId = e.attr("data-section-id"));
            e.attr("data-section-type");
            (this.footerTopId = $("#shopify-section-" + i)), (this.footerTop = $("#footer-top-" + i)), (this.footerTopNamspace = "#footer-top-" + i), this._init();
        }
        return (
            (t.prototype = _.assignIn({}, t.prototype, {
                _init: function () {},
                onUnload: function () {
                    this.$container.off(this.footerTopNamspace);
                },
            })),
            t
        );
    })()),
    (theme.FooterCopyRightSection = (function () {
        function t(t) {
            var e = (this.$container = $(t)),
                i = (this.sectionId = e.attr("data-section-id"));
            e.attr("data-section-type");
            (this.footerCopyRightId = $("#shopify-section-" + i)), (this.footerCopyRight = $("#footer-copyright-" + i)), (this.footerCopyRightNamspace = "#footer-copyright-" + i), this._init();
        }
        return (
            (t.prototype = _.assignIn({}, t.prototype, {
                _init: function () {},
                onUnload: function () {
                    this.$container.off(this.footerCopyRightNamspace);
                },
            })),
            t
        );
    })()),
    (theme.FooterColumn = (function () {
        function t(t) {
            var e = (this.$container = $(t)),
                i = (this.sectionId = e.attr("data-section-id"));
            e.attr("data-section-type");
            (this.footerColumnId = $("#shopify-section-" + i)), (this.footerColumn = $("#footer-column-" + i)), (this.footerColumnNamspace = "#footer-column-" + i), (this._class = this.footerColumn.data("_class")), this._init();
        }
        return (
            (t.prototype = _.assignIn({}, t.prototype, {
                _init: function () {
                    "" != this._class && this.footerColumnId.addClass(this._class);
                },
                onUnload: function () {
                    this.$container.off(this.footerColumnNamspace);
                },
            })),
            t
        );
    })()),
    (theme.TestimonialSection = (function () {
        function t(t) {
            var e = (this.$container = $(t)),
                i = (this.sectionId = e.attr("data-section-id"));
            e.attr("data-section-type");
            (this.testimonialId = $("#shopify-section-" + i)),
                (this.testimonial = $("#testimonial-" + i)),
                (this.testimonialNamspace = "#testimonial-" + i),
                (this.placement_fullwidth = this.testimonial.data("placement_fullwidth")),
                this._init();
        }
        return (
            (t.prototype = _.assignIn({}, t.prototype, {
                _init: function () {
                    var t = this.sectionId,
                        e = $(".box #myCarousel_testi_" + t + " .testimonial-slide"),
                        i = !1;
                    (1 == parseInt(window.rtl) && (i = !0),
                    e.not(".slick-initialized").slick({ arrows: !1, slidesToShow: 1, slidesToScroll: 1, rtl: i }),
                    $("#myCarousel_testi_next_" + t).click(function () {
                        return e.slick("slickNext"), !1;
                    }),
                    $("#myCarousel_testi_prev_" + t).click(function () {
                        return e.slick("slickPrev"), !1;
                    }),
                    $(window).resize(function () {
                        e.slick("setPosition");
                    }),
                    "1" != this.placement_fullwidth || window.sidebar) || onFullWidthOption((t = this.sectionId));
                },
                onUnload: function () {
                    this.$container.off(this.testimonialNamspace);
                },
            })),
            t
        );
    })()),
    (theme.LatestBlogSection = (function () {
        function t(t) {
            var e = (this.$container = $(t)),
                i = (this.sectionId = e.attr("data-section-id"));
            e.attr("data-section-type");
            (this.latestBlogId = $("#shopify-section-" + i)),
                (this.latestBlog = $("#latest_blog-" + i)),
                (this.latestBlogSlider = $("#latest_blog-" + i + " .blog-slick-slider")),
                (this.latestBlogNamspace = "#latest_blog-" + i),
                (this.placement_fullwidth = this.latestBlog.data("placement_fullwidth")),
                this._init();
        }
        return (
            (t.prototype = _.assignIn({}, t.prototype, {
                _init: function () {
                    "1" != this.placement_fullwidth || window.sidebar || onFullWidthOption(this.sectionId);
                    this._initSlide();
                },
                _initSlide: function () {
                    var t = !1;
                    1 == parseInt(window.rtl) && (t = !0),
                        0 < this.latestBlogSlider.length &&
                            this.latestBlogSlider
                                .not(".slick-initialized")
                                .slick({
                                    rtl: t,
                                    slidesToShow: 3,
                                    slidesToScroll: 1,
                                    prevArrow: '<a class="prev-button arrow-btn" href="#"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#global__symbols-prev"></use></svg></a>',
                                    nextArrow: '<a class="next-button arrow-btn" href="#"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#global__symbols-next"></use></svg></a>',
                                    responsive: [{ breakpoint: 767, settings: { slidesToShow: 1, slidesToScroll: 1 } }],
                                });
                },
                onUnload: function () {
                    this.$container.off(this.latestBlogNamspace);
                },
            })),
            t
        );
    })()),
    (theme.InstafeedSection = (function () {
        function t(t) {
            var e = (this.$container = $(t)),
                i = (this.sectionId = e.attr("data-section-id"));
            e.attr("data-section-type");
            (this.instafeedId = $("#shopify-section-" + i)),
                (this.instafeed = $("#home-instagram-widget-" + i)),
                (this.instafeedNamspace = "#home-instagram-widget-" + i),
                (this.instagram_list = $("#instagram_home_" + i)),
                (this.instagram_target = "instagram_home_" + i),
                (this.placement_fullwidth = this.instafeed.data("placement_fullwidth")),
                this._init();
        }
        return (
            (t.prototype = _.assignIn({}, t.prototype, {
                _init: function () {
                    "1" != this.placement_fullwidth || window.sidebar || onFullWidthOption(this.sectionId);
                    0 < this.instagram_list.length && this._instafeedRun();
                },
                _instafeedRun: function () {
                    var t = this.instagram_target,
                        e = this.instagram_list.data("social_instagram_token"),
                        i = this.instagram_list.data("user_id"),
                        a = this.instagram_list.data("home_instafeed_limit");
                    new Instafeed({
                        get: "user",
                        target: t,
                        accessToken: e,
                        userId: i,
                        limit: a,
                        resolution: "thumbnail",
                        resolution2: "standard_resolution",
                        template: '<div class="wrap animated"><a target="_blank" href="{{link}}"><img src="{{image}}" alt="{{caption}}" width="150" height="150" /><span class="hover_border"></span></a></div>',
                    }).run();
                },
                onUnload: function () {
                    this.$container.off(this.instafeedNamspace);
                },
            })),
            t
        );
    })()),
    (theme.mobileNavSection = (function () {
        function t(t) {
            var e = (this.$container = $(t)),
                i = (this.sectionId = e.attr("data-section-id"));
            e.attr("data-section-type");
            (this.mobileNavId = $("#shopify-section-" + i)), (this.mobileNav = $("#primary-" + i)), (this.mobilenavNamespace = "#primary-" + i), this._init();
        }
        return (
            (t.prototype = _.assignIn({}, t.prototype, {
                _init: function () {
                    this._initMobile();
                },
                _initMobile: function () {
                    $("#off-canvas-layer").on("click", function () {
                        $(document.body).removeClass("open-canvas-panel"), $(document.body).removeClass("open_filter");
                    }),
                        $(".mobile-nav-icon").on("click", function () {
                            $(document.body).toggleClass("open-canvas-panel");
                        }),
                        $(".mobile-child-menu").on("click", function () {
                            $(this).closest(".menu-item-has-children").toggleClass("mobile-active");
                        }),
                        $(".mobile-nav-search, .mobile-nav-search-close").on("click", function () {
                            $(document.body).toggleClass("open-search-form"), $(".mobile-nav-search-form input").focus();
                        }),
                        $(window).on("resize", function () {
                            991 < $(window).width() && $(document.body).removeClass("open-canvas-panel");
                        });
                },
                onUnload: function () {
                    this.$container.off(this.mobilenavNamespace);
                },
            })),
            t
        );
    })()),
    (theme.ProductVariantMobile = (function () {
        function t(t) {
            var e = (this.$container = $(t)),
                i = (this.sectionId = e.attr("data-section-id"));
            e.attr("data-section-type");
            (this.wrapperId = $("#" + i)), (this.wrapper = $("#" + i)), (this.wrapperNamspace = "#" + i), (this.addCartId = $("#btn-" + i + ".m-allow-cart")), (this.addCartClass = $(".variant-item-" + i + ".m-allow-cart")), this._init();
        }
        return (
            (t.prototype = _.assignIn({}, t.prototype, {
                _init: function () {
                    var t = this;
                    t._initScroll(),
                        t._initCompact(),
                        t._initEvents(),
                        $(window).resize(function () {
                            991 >= $(window).width() && t._initCompact();
                        });
                },
                _initScroll: function () {
                    $(window).on("scroll", function () {
                        var t = $("#shopify-section-product-variants-mobile").height();
                        $(window).scrollTop() > t
                            ? $(document.body).addClass("sticky-product-variants-mobile")
                            : ($(document.body).removeClass("sticky-product-variants-mobile"), $(".product-variants-mobile").hasClass("active") && $(".product-variants-mobile").height($(".variants-header").data("height")));
                    });
                },
                _initCompact: function () {
                    if (0 < $(".product-variant-mobile-section").length) {
                        var t = $(".product-variant-mobile-section"),
                            e = $(".product-variants-mobile");
                        e.each(function () {
                            var t = $(this),
                                e = t.find(".variants-header"),
                                i = e.innerHeight(),
                                a = t.find(".variants-content").outerHeight();
                            e.closest(".product-variants-mobile");
                            e.data("height", i), t.data("height", i + a);
                        }),
                            e.each(function () {
                                var t = $(this),
                                    e = t.find(".variants-header"),
                                    i = e.innerHeight(),
                                    a = t.find(".variants-content").outerHeight(),
                                    n = e.closest(".product-variants-mobile");
                                e.data("height", i), t.data("height", i + a), n.hasClass("active") && n.height(n.data("height"));
                            }),
                            t.unbind("click") &&
                                t.on("click", ".variants-header .title", function () {
                                    var t = $(this),
                                        i = t.closest(".variants-header"),
                                        a = t.closest(".product-variants-mobile");
                                    a.hasClass("active") || e.closest(".active").removeClass("active").height(t.data("height")), a.toggleClass("active"), a.hasClass("active") ? a.height(a.data("height")) : a.height(i.data("height"));
                                });
                    }
                },
                _initEvents: function () {
                    var t = $("#ProductSelect-product-template.variation-select").val();
                    0 < this.addCartId.length &&
                        (this.addCartId.unbind("click"),
                        this.addCartId.on("click", function () {
                            $("#ProductSelect-product-template.variation-select").val(t), $("#AddToCart-product-template").trigger("click");
                        })),
                        0 < this.addCartClass.length &&
                            (this.addCartClass.unbind("click"),
                            this.addCartClass.on("click", function () {
                                var t = $(this).data("id");
                                $("#ProductSelect-product-template.variation-select").val(t), $("#AddToCart-product-template").trigger("click");
                            }));
                },
                onUnload: function () {
                    this.$container.off(this.wrapperNamspace);
                },
            })),
            t
        );
    })()),
    (theme.CartVariantMobile = (function () {
        function t(t) {
            var e = (this.$container = $(t)),
                i = (this.sectionId = e.attr("data-section-id"));
            e.attr("data-section-type");
            (this.wrapperId = $("#" + i)), (this.wrapper = $("#" + i)), (this.wrapperNamspace = "#" + i), (this.addCartId = $("#btn-" + i + ".m-allow-cart")), (this.addCartClass = $(".variant-item-" + i + ".m-allow-cart")), this._init();
        }
        return (
            (t.prototype = _.assignIn({}, t.prototype, {
                _init: function () {
                    this._initScroll();
                },
                _initScroll: function () {
                    $(window).on("scroll", function () {
                        var t = $("#shopify-section-product-variants-mobile").height();
                        $(window).scrollTop() > t
                            ? $(document.body).addClass("sticky-product-variants-mobile")
                            : ($(document.body).removeClass("sticky-product-variants-mobile"), $(".product-variants-mobile").hasClass("active") && $(".product-variants-mobile").height($(".variants-header").data("height")));
                    });
                },
                onUnload: function () {
                    this.$container.off(this.wrapperNamspace);
                },
            })),
            t
        );
    })()),
    (theme.Brands = (function () {
        function t(t) {
            var e = (this.$container = $(t)),
                i = (this.sectionId = e.attr("data-section-id"));
            e.attr("data-section-type");
            (this.brandsId = $("#brands-" + i)), (this.featuredBrands = $(".featured-brands-" + i)), (this.brandsNamspace = "#brands-" + i), this._init();
        }
        return (
            (t.prototype = _.assignIn({}, t.prototype, {
                _init: function () {
                    var t = this.featuredBrands.data("perview"),
                        e = this.featuredBrands.data("autoplay"),
                        i = this.featuredBrands.data("speed");
                    this.featuredBrands.not(".slick-initialized").slick({
                        rtl: window.rtl,
                        slidesToShow: t,
                        slidesToScroll: 1,
                        autoplaySpeed: i,
                        autoplay: e,
                        infinite: !0,
                        prevArrow: '<a class="prev-button arrow-btn" href="#"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#global__symbols-prev"></use></svg></a>',
                        nextArrow: '<a class="next-button arrow-btn" href="#"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#global__symbols-next"></use></svg></a>',
                        responsive: [
                            { breakpoint: 1200, settings: { slidesToShow: 4, slidesToScroll: 1 } },
                            { breakpoint: 992, settings: { slidesToShow: 3, slidesToScroll: 1 } },
                            { breakpoint: 767, settings: { slidesToShow: 2, slidesToScroll: 1 } },
                        ],
                    });
                },
                onUnload: function () {
                    this.$container.off(this.brandsNamspace);
                },
            })),
            t
        );
    })()),
    (theme.rvsVideo = (function () {
        function t(t) {
            var e = (this.$container = $(t)),
                i = (this.sectionId = e.attr("data-section-id"));
            e.attr("data-section-type");
            (this.rvsId = $("#shopify-section-" + i)),
                (this.rvsNamspace = "#rvsvideo-" + i + "_wrapper"),
                (this.rvsMain = "#rvsvideo-" + i),
                (this.placement_fullwidth = $(this.rvsNamspace).data("placement_fullwidth")),
                (this.delayTime = $(this.rvsNamspace).data("delaytime")),
                this._init();
        }
        return (
            (t.prototype = _.assignIn({}, t.prototype, {
                _init: function () {
                    var t,
                        e = this.sectionId,
                        i = this.rvsMain,
                        a = this.delayTime,
                        n = this.placement_fullwidth,
                        o = jQuery;
                    o(document).ready(function () {
                        null == o(i).revolution
                            ? revslider_showDoubleJqueryError(i)
                            : (t = o(i)
                                  .show()
                                  .revolution({
                                      sliderType: "carousel",
                                      jsFileLocation: "https://storage.googleapis.com/revolutionslider/revolution/js/",
                                      sliderLayout: "fullwidth",
                                      dottedOverlay: "none",
                                      delay: a,
                                      navigation: {
                                          keyboardNavigation: "off",
                                          keyboard_direction: "horizontal",
                                          mouseScrollNavigation: "off",
                                          mouseScrollReverse: "default",
                                          onHoverStop: "off",
                                          touch: { touchenabled: "on", touchOnDesktop: "off", swipe_threshold: 75, swipe_min_touches: 1, swipe_direction: "horizontal", drag_block_vertical: !1 },
                                          arrows: {
                                              style: "gyges",
                                              enable: !0,
                                              hide_onmobile: !1,
                                              hide_onleave: !1,
                                              tmp: "",
                                              left: { h_align: "left", v_align: "center", h_offset: 20, v_offset: 0 },
                                              right: { h_align: "right", v_align: "center", h_offset: 20, v_offset: 0 },
                                          },
                                          tabs: {
                                              style: "gyges",
                                              enable: !0,
                                              width: 250,
                                              height: 80,
                                              min_width: 250,
                                              wrapper_padding: 30,
                                              wrapper_color: "rgba(38,41,43,1)",
                                              tmp: '<div class="tp-tab-content">  <span class="tp-tab-date">{{param1}}</span>  <span class="tp-tab-title">{{title}}</span></div><div class="tp-tab-image"></div>',
                                              visibleAmount: 5,
                                              hide_onmobile: !1,
                                              hide_onleave: !1,
                                              hide_delay: 200,
                                              direction: "horizontal",
                                              span: !0,
                                              position: "outer-bottom",
                                              space: 0,
                                              h_align: "center",
                                              v_align: "bottom",
                                              h_offset: 0,
                                              v_offset: 0,
                                          },
                                      },
                                      carousel: {
                                          horizontal_align: "center",
                                          vertical_align: "center",
                                          fadeout: "on",
                                          vary_fade: "on",
                                          maxVisibleItems: 3,
                                          infinity: "on",
                                          space: 0,
                                          stretch: "off",
                                          showLayersAllTime: "off",
                                          easing: "Power3.easeInOut",
                                          speed: "800",
                                      },
                                      visibilityLevels: [1240, 1024, 778, 480],
                                      gridwidth: 720,
                                      gridheight: 405,
                                      lazyType: "none",
                                      shadow: 0,
                                      spinner: "off",
                                      stopLoop: "on",
                                      stopAfterLoops: 0,
                                      stopAtSlide: 1,
                                      shuffle: "off",
                                      autoHeight: "off",
                                      disableProgressBar: "on",
                                      hideThumbsOnMobile: "off",
                                      hideSliderAtLimit: 0,
                                      hideCaptionAtLimit: 0,
                                      hideAllCaptionAtLilmit: 0,
                                      debugMode: !1,
                                      fallbacks: { simplifyAll: "off", nextSlideOnWindowFocus: "off", disableFocusListener: !1 },
                                  })).one("revolution.slide.onloaded", function () {
                                  "1" != n || window.sidebar || onFullWidthOption(e), t.revredraw();
                              });
                    });
                },
                onUnload: function () {},
            })),
            t
        );
    })()),
    (theme.rvsHighlight = (function () {
        function t(t) {
            var e = (this.$container = $(t)),
                i = (this.sectionId = e.attr("data-section-id"));
            e.attr("data-section-type");
            (this.rvshighlightId = $("#shopify-section-" + i)),
                (this.rvshighlightNamspace = "#rvshighlight-" + i + "_wrapper"),
                (this.rvshighlightMain = "#rvshighlight-" + i),
                (this.placement_fullwidth = $(this.rvshighlightNamspace).data("placement_fullwidth")),
                (this.delayTime = $(this.rvshighlightNamspace).data("delaytime")),
                this._init();
        }
        return (
            (t.prototype = _.assignIn({}, t.prototype, {
                _init: function () {
                    var t,
                        e = this.sectionId,
                        i = this.rvshighlightMain,
                        a = this.delayTime,
                        n = this.placement_fullwidth,
                        o = jQuery;
                    o(document).ready(function () {
                        null == o(i).revolution
                            ? revslider_showDoubleJqueryError(i)
                            : (t = o(i)
                                  .show()
                                  .revolution({
                                      sliderType: "standard",
                                      jsFileLocation: "https://storage.googleapis.com/revolutionslider/revolution/js/",
                                      sliderLayout: "auto",
                                      dottedOverlay: "none",
                                      delay: a,
                                      navigation: {
                                          keyboardNavigation: "off",
                                          keyboard_direction: "horizontal",
                                          mouseScrollNavigation: "off",
                                          mouseScrollReverse: "default",
                                          onHoverStop: "off",
                                          touch: { touchenabled: "on", swipe_threshold: 75, swipe_min_touches: 1, swipe_direction: "horizontal", drag_block_vertical: !1 },
                                          tabs: {
                                              style: "zeus",
                                              enable: !0,
                                              width: 100,
                                              height: 30,
                                              min_width: 100,
                                              wrapper_padding: 0,
                                              wrapper_color: "transparent",
                                              wrapper_opacity: "0",
                                              tmp: '<span class="tp-tab-title">{{title}}</span>',
                                              visibleAmount: 3,
                                              hide_onmobile: !0,
                                              hide_under: 480,
                                              hide_onleave: !1,
                                              hide_delay: 200,
                                              direction: "horizontal",
                                              span: !0,
                                              position: "inner",
                                              space: 1,
                                              h_align: "left",
                                              v_align: "top",
                                              h_offset: 30,
                                              v_offset: 30,
                                          },
                                      },
                                      viewPort: { enable: !0, outof: "pause", visible_area: "90%", presize: !1 },
                                      responsiveLevels: [1240, 1024, 778, 480],
                                      visibilityLevels: [1240, 1024, 778, 480],
                                      gridwidth: [1230, 1024, 767, 480],
                                      gridheight: [720, 720, 480, 360],
                                      lazyType: "none",
                                      parallax: { type: "scroll", origo: "enterpoint", speed: 400, levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 46, 47, 48, 49, 50, 55], type: "scroll" },
                                      shadow: 0,
                                      spinner: "off",
                                      stopLoop: "off",
                                      stopAfterLoops: -1,
                                      stopAtSlide: -1,
                                      shuffle: "off",
                                      autoHeight: "off",
                                      hideThumbsOnMobile: "off",
                                      hideSliderAtLimit: 0,
                                      hideCaptionAtLimit: 0,
                                      hideAllCaptionAtLilmit: 0,
                                      debugMode: !1,
                                      fallbacks: { simplifyAll: "off", nextSlideOnWindowFocus: "off", disableFocusListener: !1 },
                                  })).one("revolution.slide.onloaded", function () {
                                  "1" != n || window.sidebar || onFullWidthOption(e), t.revredraw();
                              });
                    });
                },
                onUnload: function () {},
            })),
            t
        );
    })()),
    (theme.rvsProducts = (function () {
        function t(t) {
            var e = (this.$container = $(t)),
                i = (this.sectionId = e.attr("data-section-id"));
            e.attr("data-section-type");
            (this.rvsproductsId = $("#shopify-section-" + i)),
                (this.rvsproductsNamspace = "#rvsproducts-" + i + "_wrapper"),
                (this.rvsproductsMain = "#rvsproducts-" + i),
                (this.placement_fullwidth = $(this.rvsproductsNamspace).data("placement_fullwidth")),
                (this.delayTime = $(this.rvsproductsNamspace).data("delaytime")),
                this._init();
        }
        return (
            (t.prototype = _.assignIn({}, t.prototype, {
                _init: function () {
                    var t,
                        e = this.sectionId,
                        i = this.rvsproductsMain,
                        a = this.delayTime,
                        n = this.placement_fullwidth,
                        o = jQuery;
                    o(document).ready(function () {
                        null == o(i).revolution
                            ? revslider_showDoubleJqueryError(i)
                            : (t = o(i)
                                  .show()
                                  .revolution({
                                      sliderType: "standard",
                                      jsFileLocation: "https://storage.googleapis.com/revolutionslider/revolution/js/",
                                      sliderLayout: "auto",
                                      dottedOverlay: "none",
                                      delay: a,
                                      navigation: {
                                          keyboardNavigation: "off",
                                          keyboard_direction: "horizontal",
                                          mouseScrollNavigation: "off",
                                          mouseScrollReverse: "default",
                                          onHoverStop: "on",
                                          touch: { touchenabled: "on", swipe_threshold: 75, swipe_min_touches: 50, swipe_direction: "horizontal", drag_block_vertical: !1 },
                                          arrows: {
                                              style: "gyges",
                                              enable: !0,
                                              hide_onmobile: !1,
                                              hide_onleave: !1,
                                              tmp: "",
                                              left: { h_align: "right", v_align: "bottom", h_offset: 40, v_offset: 0 },
                                              right: { h_align: "right", v_align: "bottom", h_offset: 0, v_offset: 0 },
                                          },
                                      },
                                      responsiveLevels: [1240, 1024, 778, 480],
                                      visibilityLevels: [1240, 1024, 778, 480],
                                      gridwidth: [1200, 1024, 778, 480],
                                      gridheight: [600, 600, 600, 600],
                                      lazyType: "single",
                                      parallax: { type: "scroll", origo: "slidercenter", speed: 400, levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 46, 47, 48, 49, 50, 51, 55], type: "scroll" },
                                      shadow: 0,
                                      spinner: "off",
                                      stopLoop: "off",
                                      stopAfterLoops: -1,
                                      stopAtSlide: -1,
                                      shuffle: "off",
                                      autoHeight: "off",
                                      disableProgressBar: "on",
                                      hideThumbsOnMobile: "off",
                                      hideSliderAtLimit: 0,
                                      hideCaptionAtLimit: 0,
                                      hideAllCaptionAtLilmit: 0,
                                      debugMode: !1,
                                      fallbacks: { simplifyAll: "off", nextSlideOnWindowFocus: "off", disableFocusListener: !1 },
                                  })).one("revolution.slide.onloaded", function () {
                                  "1" != n || window.sidebar || onFullWidthOption(e), t.revredraw();
                              });
                    });
                },
                onUnload: function () {},
            })),
            t
        );
    })()),
    (theme.YourCollections = (function () {
        function t(t) {
            var e = (this.$container = $(t)),
                i = (this.sectionId = e.attr("data-section-id"));
            e.attr("data-section-type");
            (this.latestCategoryId = $("#shopify-section-" + i)),
                (this.latestCategoryNamspace = $(".your-collections-" + i)),
                (this._limit = this.latestCategoryNamspace.data("limit")),
                (this._speed = this.latestCategoryNamspace.data("speed")),
                (this._autoplay = this.latestCategoryNamspace.data("autoplay")),
                (this.placement_fullwidth = this.latestCategoryNamspace.data("placement_fullwidth")),
                this._init();
        }
        return (
            (t.prototype = _.assignIn({}, t.prototype, {
                _init: function () {
                    var t = this.sectionId,
                        e = ".your-collections-wrapper .CollectionGrid-" + t;
                    "1" != this.placement_fullwidth || window.sidebar || onFullWidthOption(t),
                        $(e).slick({
                            slidesToShow: this._limit,
                            slidesToScroll: 1,
                            autoplay: this._autoplay,
                            autoplaySpeed: this._speed,
                            prevArrow: '<a class="prev-button arrow-btn" href="#"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#global__symbols-prev"></use></svg></a>',
                            nextArrow: '<a class="next-button arrow-btn" href="#"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#global__symbols-next"></use></svg></a>',
                            rtl: window.rtl,
                            responsive: [
                                { breakpoint: 992, settings: { slidesToShow: 4, slidesToScroll: 1 } },
                                { breakpoint: 767, settings: { slidesToShow: 3, slidesToScroll: 1 } },
                                { breakpoint: 469, settings: { slidesToShow: 2, slidesToScroll: 1 } },
                            ],
                        }),
                        roar.initLazyLoading(e, !0);
                },
                onUnload: function () {
                    this.$container.off(this.latestCategoryNamspace);
                },
            })),
            t
        );
    })()),
    (theme.CollectionsList = (function () {
        function t(t) {
            var e = (this.$container = $(t)),
                i = (this.sectionId = e.attr("data-section-id"));
            e.attr("data-section-type");
            (this.latestCollectionId = $("#shopify-section-" + i)),
                (this.latestCollectionNamspace = $(".collections-list-" + i)),
                (this._limit = this.latestCollectionNamspace.data("limit")),
                (this._total = this.latestCollectionNamspace.data("count")),
                (this._speed = this.latestCollectionNamspace.data("speed")),
                (this._autoplay = this.latestCollectionNamspace.data("autoplay")),
                (this.placement_fullwidth = this.latestCollectionNamspace.data("placement_fullwidth")),
                this._init();
        }
        return (
            (t.prototype = _.assignIn({}, t.prototype, {
                _init: function () {
                    this.sectionId;
                    var t = ".content-colection-list-" + this.sectionId;
                    roar.initLazyLoading(t, !0),
                        $(t).slick({
                            slidesToShow: this._limit,
                            slidesToScroll: 1,
                            autoplay: this._autoplay,
                            autoplaySpeed: this._speed,
                            prevArrow: '<a class="prev-button arrow-btn" href="#"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#global__symbols-prev"></use></svg></a>',
                            nextArrow: '<a class="next-button arrow-btn" href="#"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#global__symbols-next"></use></svg></a>',
                            rtl: window.rtl,
                            responsive: [
                                { breakpoint: 767, settings: { slidesToShow: 2, slidesToScroll: 1 } },
                                { breakpoint: 469, settings: { slidesToShow: 1, slidesToScroll: 1 } },
                            ],
                        });
                },
                onUnload: function () {
                    this.$container.off(this.latestCollectionNamspace);
                },
            })),
            t
        );
    })()),
    (theme.ShippingCalculator = (function () {
        function ShippingCalculator(t) {
            var e = (this.$container = $(t)).attr("data-section-id");
            (this.selectors = {
                shipping_btn: "#cart__shipping-btn-" + e,
                shipping_calculator: "#shipping__calculator-" + e,
                get_rates: "#shipping__calculator-btn-" + e,
                response: "#shipping__calculator-response-" + e,
                template: '<p id ="shipping-rates-feedback-' + e + '" class="shipping-rates-feedback"></p>',
                address_country: "address_country-" + e,
                address_province: "address_province-" + e,
                address_zip: "address_zip-" + e,
                address_province_label: "address_province_label-" + e,
                address_province_container: "address_province_container-" + e,
            }),
                (this.strings = { submitButton: "Calculate shipping", submitButtonDisabled: "Calculating...", customerIsLoggedIn: !1, moneyFormat: theme.settings.moneyFormat }),
                this._init();
        }
        return (
            (ShippingCalculator.prototype = _.assignIn({}, ShippingCalculator.prototype, {
                _disableButtons: function () {
                    var t = this.selectors,
                        e = this.strings;
                    $(t.get_rates).text(e.submitButtonDisabled).attr("disabled", "disabled").addClass("disabled");
                },
                _enableButtons: function () {
                    var t = this.selectors,
                        e = this.strings;
                    $(t.get_rates).removeAttr("disabled").removeClass("disabled").text(e.submitButton);
                },
                _render: function (t) {
                    var e = this.selectors,
                        i = (this.strings, $(e.template)),
                        a = $(e.response);
                    if (a.length) {
                        if (t.success)
                            if ((i.addClass("success"), t.rates)) {
                                i.append(t.rates);
                                var n = t.rates;
                                if (n[0]) {
                                    var o = n[0];
                                    i.append('Rates start at <span class="money">' + o.price + "</span>.");
                                }
                            } else i.append("We do not ship to this destination.");
                        else i.addClass("error"), i.append(t.errorFeedback);
                        i.appendTo(a), theme.CurrencyPicker.convert(e.response + " .money");
                    }
                },
                _formatRate: function (t) {
                    function e(t, e) {
                        return void 0 === t ? e : t;
                    }
                    function i(t, i, a, n) {
                        if (((i = e(i, 2)), (a = e(a, ",")), (n = e(n, ".")), isNaN(t) || null == t)) return 0;
                        var o = (t = (t / 100).toFixed(i)).split(".");
                        return o[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + a) + (o[1] ? n + o[1] : "");
                    }
                    this.selectors;
                    var a = this.strings;
                    if ("function" == typeof theme.Currency.formatMoney) return theme.Currency.formatMoney(t, a.moneyFormat);
                    "string" == typeof t && (t = t.replace(".", ""));
                    var n = "",
                        o = /\{\{\s*(\w+)\s*\}\}/,
                        r = a.moneyFormat;
                    switch (r.match(o)[1]) {
                        case "amount":
                            n = i(t, 2);
                            break;
                        case "amount_no_decimals":
                            n = i(t, 0);
                            break;
                        case "amount_with_comma_separator":
                            n = i(t, 2, ".", ",");
                            break;
                        case "amount_no_decimals_with_comma_separator":
                            n = i(t, 0, ".", ",");
                    }
                    return r.replace(o, n);
                },
                _onCartShippingRatesUpdate: function (t, e) {
                    var i = this,
                        a = this.selectors;
                    this.strings;
                    i._enableButtons();
                    var n = "";
                    if ((e.zip && (n += e.zip + ", "), e.province && (n += e.province + ", "), (n += e.country), t.length)) for (var o = 0; o < t.length; o++) t[o].price = i._formatRate(t[o].price);
                    i._render({ rates: t, address: n, success: !0 }), $(a.response).fadeIn();
                },
                _pollForCartShippingRatesForDestination: function (t) {
                    var e = this,
                        i =
                            (this.selectors,
                            this.strings,
                            function () {
                                $.ajax("/cart/async_shipping_rates", {
                                    dataType: "json",
                                    success: function (a, n, o) {
                                        200 === o.status ? e._onCartShippingRatesUpdate(a.shipping_rates, t) : setTimeout(i, 500);
                                    },
                                    error: function (t, i) {
                                        e._onError(t, i, e);
                                    },
                                });
                            });
                    return i;
                },
                _fullMessagesFromErrors: function (t) {
                    this.selectors, this.strings;
                    var e = [];
                    return (
                        $.each(t, function (t, i) {
                            $.each(i, function (i, a) {
                                e.push(t + " " + a);
                            });
                        }),
                        e
                    );
                },
                _onError: function (XMLHttpRequest, textStatus, self) {
                    var selectors = self.selectors,
                        strings = self.strings;
                    self._enableButtons();
                    var feedback = "",
                        data = eval("(" + XMLHttpRequest.responseText + ")");
                    (feedback = data.message ? data.message + "(" + data.status + "): " + data.description : "Error : " + self._fullMessagesFromErrors(data).join("; ") + "."),
                        "Error : country is not supported." == feedback && (feedback = "We do not ship to this destination."),
                        self._render({ rates: [], errorFeedback: feedback, success: !1 }),
                        $(selectors.response).show();
                },
                _getCartShippingRatesForDestination: function (t) {
                    var e = this;
                    this.selectors, this.strings;
                    $.ajax({
                        type: "POST",
                        url: "/cart/prepare_shipping_rates",
                        data: $.param({ shipping_address: t }),
                        success: e._pollForCartShippingRatesForDestination(t),
                        error: function (t, i) {
                            e._onError(t, i, e);
                        },
                    });
                },
                _init: function () {
                    var t = this,
                        e = this.selectors,
                        i = this.strings;
                    if ($(e.shipping_calculator).length) {
                        new Shopify.CountryProvinceSelector(e.address_country, e.address_province, { hideElement: e.address_province_container });
                        var a = $("#" + e.address_country),
                            n = $("#" + e.address_province_label).get(0);
                        "undefined" != typeof Countries &&
                            (Countries.updateProvinceLabel(a.val(), n),
                            a.change(function () {
                                Countries.updateProvinceLabel(a.val(), n);
                            })),
                            $(e.get_rates).click(function () {
                                t._disableButtons(), $(e.response).empty().hide();
                                var i = {};
                                (i.zip = $("#" + e.address_zip).val() || ""), (i.country = $("#" + e.address_country).val() || ""), (i.province = $("#" + e.address_province).val() || ""), t._getCartShippingRatesForDestination(i);
                            }),
                            i.customerIsLoggedIn && $(e.get_rates + ":eq(0)").trigger("click"),
                            $(e.shipping_btn).click(function () {
                                $(e.shipping_calculator).slideToggle();
                            });
                    }
                },
                onUnload: function () {},
            })),
            ShippingCalculator
        );
    })()),
    (theme.GalleryTemplate = (function () {
        function t(t) {
            var e = (this.$container = $(t)).attr("data-section-id");
            (this.selectors = { grid_gallery: "grid-gallery-" + e }), this._init();
        }
        return (
            (t.prototype = _.assignIn({}, t.prototype, {
                _init: function () {
                    new CBPGridGallery(document.getElementById(this.selectors.grid_gallery));
                },
                onUnload: function () {},
            })),
            t
        );
    })()),
    $(document).ready(function () {
        var t = new theme.Sections();
        t.register("product-template", theme.Product),
            t.register("mega-menu", theme.MegaMenuSection),
            t.register("topblock-section", theme.TopBlockSection),
            t.register("custom-widget", theme.CustomWidgetSection),
            t.register("banner", theme.BannerSection),
            t.register("delivery-bar", theme.DeliveryBarSection),
            t.register("slideshow", theme.SlideShowSection),
            t.register("slideshow-with-html", theme.SlideShowSection),
            t.register("slideshow-with-megamenu", theme.SlideShowSection),
            t.register("sidebar", theme.SidebarSection),
            t.register("product-tab", theme.ProductTabSection),
            t.register("advanced-grid", theme.AdvancedGridSection),
            t.register("preface-footer", theme.PrefaceFooterSection),
            t.register("footer-top", theme.FooterTopSection),
            t.register("footer-bottom", theme.FooterBottomSection),
            t.register("footer-copyright", theme.FooterCopyRightSection),
            t.register("footer-column-1", theme.FooterColumn),
            t.register("footer-column-2", theme.FooterColumn),
            t.register("footer-column-3", theme.FooterColumn),
            t.register("footer-column-4", theme.FooterColumn),
            t.register("testimonial", theme.TestimonialSection),
            t.register("instafeed", theme.InstafeedSection),
            t.register("latest-blog", theme.LatestBlogSection),
            t.register("mobile-nav-section", theme.mobileNavSection),
            t.register("product-variant-mobile", theme.ProductVariantMobile),
            t.register("cart-variant-mobile", theme.CartVariantMobile),
            t.register("brands", theme.Brands),
            t.register("rvsvideo", theme.rvsVideo),
            t.register("rvshighlight", theme.rvsHighlight),
            t.register("rvsproducts", theme.rvsProducts),
            t.register("your-collections", theme.YourCollections),
            t.register("collections-list", theme.CollectionsList),
            t.register("shipping-calculator", theme.ShippingCalculator),
            t.register("collection-template", theme.Filters),
            t.register("search-template", theme.Filters),
            t.register("gallery-template", theme.GalleryTemplate);
    }),
    (function () {
        if (document.getElementById("fromDate")) {
            var t = Date.today().addDays(7);
            (t.is().saturday() || t.is().sunday()) && (t = t.next().monday());
            var e = Date.today().addDays(10);
            (e.is().saturday() || e.is().sunday()) && (e = e.next().monday()), (document.getElementById("fromDate").innerHTML = t.toString("dd/MM")), (document.getElementById("toDate").innerHTML = e.toString("dd/MM"));
        }
    })();

$(document).ready(function(){
  $('.swatch-list .swatch-item').click(function(){
    let product_url = $(this).parents('.product').find('a')[0].href;
    let variant_id = $(this).attr('variant-id');
    let full_url = product_url + '?variant=' + variant_id;
    let variant_image = $(this).attr('variant-img');
    
    $(this).parents('.product').find('a').attr('href', full_url);
    $('.swatch-list .swatch-item').removeClass('active');
    $('.product img.top-image').attr('src', '').css('display','none');
  	$(this).addClass('active');
    $(this).parents('.product').find('img.top-image').attr('src', variant_image).css('display','block');
    $(this).parents('.product').find('img.mpt-image').attr('src', variant_image);
    
  })
  .hover(function(){
    $('.product img.top-image').attr('src', '').css('display','none');
    let variant_image = $(this).attr('variant-img');
    console.log(variant_image)
    $(this).parents('.product').find('img.top-image').attr('src', variant_image).css('display','block');
  })
  .mouseout(function(){
    if($(this).hasClass('active')) {
      let variant_image = $(this).attr('variant-img');
      $(this).parents('.product').find('img.top-image').attr('src', variant_image).css('display','block');

    }
    else
      $(this).parents('.product').find('img.top-image').attr('src', '').css('display','none');
  });
  
});