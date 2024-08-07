/*!
 * FullCalendar v3.6.1
 * Docs & License: https://fullcalendar.io/
 * (c) 2017 Adam Shaw
 */

/*
 * Use fullcalendar.css for basic styling.
 * For event drag & drop, requires jQuery UI draggable.
 * For event resizing, requires jQuery UI resizable.
 */

layui.define(["jquery"], function (exports) {
    var jQuery = layui.jquery;
    (function ($) {

        !function (t) {
            "function" == typeof define && define.amd ? define(["jquery", "moment"], t) : "object" == typeof exports ? module.exports = t(require("jquery"), require("moment")) : t(jQuery, moment)
        }(function (t, e) {
            function n(t) {
                return j(t, qt)
            }

            function i(t, e) {
                e.left && t.css({
                    "border-left-width": 1,
                    "margin-left": e.left - 1
                }), e.right && t.css({"border-right-width": 1, "margin-right": e.right - 1})
            }

            function r(t) {
                t.css({"margin-left": "", "margin-right": "", "border-left-width": "", "border-right-width": ""})
            }

            function s() {
                t("body").addClass("fc-not-allowed")
            }

            function o() {
                t("body").removeClass("fc-not-allowed")
            }

            function a(e, n, i) {
                var r = Math.floor(n / e.length), s = Math.floor(n - r * (e.length - 1)), o = [], a = [], u = [], c = 0;
                l(e), e.each(function (n, i) {
                    var l = n === e.length - 1 ? s : r, h = t(i).outerHeight(!0);
                    h < l ? (o.push(i), a.push(h), u.push(t(i).height())) : c += h
                }), i && (n -= c, r = Math.floor(n / o.length), s = Math.floor(n - r * (o.length - 1))), t(o).each(function (e, n) {
                    var i = e === o.length - 1 ? s : r, l = a[e], c = u[e], h = i - (l - c);
                    l < i && t(n).height(h)
                })
            }

            function l(t) {
                t.height("")
            }

            function u(e) {
                var n = 0;
                return e.find("> *").each(function (e, i) {
                    var r = t(i).outerWidth();
                    r > n && (n = r)
                }), n++, e.width(n), n
            }

            function c(t, e) {
                var n, i = t.add(e);
                return i.css({
                    position: "relative",
                    left: -1
                }), n = t.outerHeight() - e.outerHeight(), i.css({position: "", left: ""}), n
            }

            function h(e) {
                var n = e.css("position"), i = e.parents().filter(function () {
                    var e = t(this);
                    return /(auto|scroll)/.test(e.css("overflow") + e.css("overflow-y") + e.css("overflow-x"))
                }).eq(0);
                return "fixed" !== n && i.length ? i : t(e[0].ownerDocument || document)
            }

            function d(t, e) {
                var n = t.offset(), i = n.left - (e ? e.left : 0), r = n.top - (e ? e.top : 0);
                return {left: i, right: i + t.outerWidth(), top: r, bottom: r + t.outerHeight()}
            }

            function f(t, e) {
                var n = t.offset(), i = p(t), r = n.left + w(t, "border-left-width") + i.left - (e ? e.left : 0),
                    s = n.top + w(t, "border-top-width") + i.top - (e ? e.top : 0);
                return {left: r, right: r + t[0].clientWidth, top: s, bottom: s + t[0].clientHeight}
            }

            function g(t, e) {
                var n = t.offset(), i = n.left + w(t, "border-left-width") + w(t, "padding-left") - (e ? e.left : 0),
                    r = n.top + w(t, "border-top-width") + w(t, "padding-top") - (e ? e.top : 0);
                return {left: i, right: i + t.width(), top: r, bottom: r + t.height()}
            }

            function p(t) {
                var e, n = t[0].offsetWidth - t[0].clientWidth, i = t[0].offsetHeight - t[0].clientHeight;
                return n = v(n), i = v(i), e = {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: i
                }, m() && "rtl" == t.css("direction") ? e.left = n : e.right = n, e
            }

            function v(t) {
                return t = Math.max(0, t), t = Math.round(t)
            }

            function m() {
                return null === Yt && (Yt = y()), Yt
            }

            function y() {
                var e = t("<div><div/></div>").css({
                    position: "absolute",
                    top: -1e3,
                    left: 0,
                    border: 0,
                    padding: 0,
                    overflow: "scroll",
                    direction: "rtl"
                }).appendTo("body"), n = e.children(), i = n.offset().left > e.offset().left;
                return e.remove(), i
            }

            function w(t, e) {
                return parseFloat(t.css(e)) || 0
            }

            function D(t) {
                return 1 == t.which && !t.ctrlKey
            }

            function b(t) {
                var e = t.originalEvent.touches;
                return e && e.length ? e[0].pageX : t.pageX
            }

            function E(t) {
                var e = t.originalEvent.touches;
                return e && e.length ? e[0].pageY : t.pageY
            }

            function S(t) {
                return /^touch/.test(t.type)
            }

            function C(t) {
                t.addClass("fc-unselectable").on("selectstart", T)
            }

            function R(t) {
                t.removeClass("fc-unselectable").off("selectstart", T)
            }

            function T(t) {
                t.preventDefault()
            }

            function I(t, e) {
                var n = {
                    left: Math.max(t.left, e.left),
                    right: Math.min(t.right, e.right),
                    top: Math.max(t.top, e.top),
                    bottom: Math.min(t.bottom, e.bottom)
                };
                return n.left < n.right && n.top < n.bottom && n
            }

            function H(t, e) {
                return {
                    left: Math.min(Math.max(t.left, e.left), e.right),
                    top: Math.min(Math.max(t.top, e.top), e.bottom)
                }
            }

            function M(t) {
                return {left: (t.left + t.right) / 2, top: (t.top + t.bottom) / 2}
            }

            function x(t, e) {
                return {left: t.left - e.left, top: t.top - e.top}
            }

            function P(e) {
                var n, i, r = [], s = [];
                for ("string" == typeof e ? s = e.split(/\s*,\s*/) : "function" == typeof e ? s = [e] : t.isArray(e) && (s = e), n = 0; n < s.length; n++) i = s[n], "string" == typeof i ? r.push("-" == i.charAt(0) ? {
                    field: i.substring(1),
                    order: -1
                } : {field: i, order: 1}) : "function" == typeof i && r.push({func: i});
                return r
            }

            function z(t, e, n) {
                var i, r;
                for (i = 0; i < n.length; i++) if (r = F(t, e, n[i])) return r;
                return 0
            }

            function F(t, e, n) {
                return n.func ? n.func(t, e) : k(t[n.field], e[n.field]) * (n.order || 1)
            }

            function k(e, n) {
                return e || n ? null == n ? -1 : null == e ? 1 : "string" === t.type(e) || "string" === t.type(n) ? String(e).localeCompare(String(n)) : e - n : 0
            }

            function B(t, n) {
                return e.duration({
                    days: t.clone().stripTime().diff(n.clone().stripTime(), "days"),
                    ms: t.time() - n.time()
                })
            }

            function A(t, n) {
                return e.duration({days: t.clone().stripTime().diff(n.clone().stripTime(), "days")})
            }

            function L(t, n, i) {
                return e.duration(Math.round(t.diff(n, i, !0)), i)
            }

            function O(t, e) {
                var n, i, r;
                for (n = 0; n < Zt.length && (i = Zt[n], !((r = V(i, t, e)) >= 1 && at(r))); n++) ;
                return i
            }

            function N(t, e) {
                var n = O(t);
                return "week" === n && "object" == typeof e && e.days && (n = "day"), n
            }

            function V(t, n, i) {
                return null != i ? i.diff(n, t, !0) : e.isDuration(n) ? n.as(t) : n.end.diff(n.start, t, !0)
            }

            function G(t, e, n) {
                var i;
                return _(n) ? (e - t) / n : (i = n.asMonths(), Math.abs(i) >= 1 && at(i) ? e.diff(t, "months", !0) / i : e.diff(t, "days", !0) / n.asDays())
            }

            function U(t, e) {
                var n, i;
                return _(t) || _(e) ? t / e : (n = t.asMonths(), i = e.asMonths(), Math.abs(n) >= 1 && at(n) && Math.abs(i) >= 1 && at(i) ? n / i : t.asDays() / e.asDays())
            }

            function W(t, n) {
                var i;
                return _(t) ? e.duration(t * n) : (i = t.asMonths(), Math.abs(i) >= 1 && at(i) ? e.duration({months: i * n}) : e.duration({days: t.asDays() * n}))
            }

            function _(t) {
                return Boolean(t.hours() || t.minutes() || t.seconds() || t.milliseconds())
            }

            function q(t) {
                return "[object Date]" === Object.prototype.toString.call(t) || t instanceof Date
            }

            function Y(t) {
                return "string" == typeof t && /^\d+\:\d+(?:\:\d+\.?(?:\d{3})?)?$/.test(t)
            }

            function j(t, e) {
                var n, i, r, s, o, a, l = {};
                if (e) for (n = 0; n < e.length; n++) {
                    for (i = e[n], r = [], s = t.length - 1; s >= 0; s--) if ("object" == typeof (o = t[s][i])) r.unshift(o); else if (void 0 !== o) {
                        l[i] = o;
                        break
                    }
                    r.length && (l[i] = j(r))
                }
                for (n = t.length - 1; n >= 0; n--) {
                    a = t[n];
                    for (i in a) i in l || (l[i] = a[i])
                }
                return l
            }

            function Z(t, e) {
                for (var n in t) Q(t, n) && (e[n] = t[n])
            }

            function Q(t, e) {
                return Qt.call(t, e)
            }

            function $(e, n, i) {
                if (t.isFunction(e) && (e = [e]), e) {
                    var r, s;
                    for (r = 0; r < e.length; r++) s = e[r].apply(n, i) || s;
                    return s
                }
            }

            function X(t, e) {
                for (var n = 0, i = 0; i < t.length;) e(t[i]) ? (t.splice(i, 1), n++) : i++;
                return n
            }

            function K(t, e) {
                for (var n = 0, i = 0; i < t.length;) t[i] === e ? (t.splice(i, 1), n++) : i++;
                return n
            }

            function J(t, e) {
                var n, i = t.length;
                if (null == i || i !== e.length) return !1;
                for (n = 0; n < i; n++) if (t[n] !== e[n]) return !1;
                return !0
            }

            function tt() {
                for (var t = 0; t < arguments.length; t++) if (void 0 !== arguments[t]) return arguments[t]
            }

            function et(t) {
                return (t + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#039;").replace(/"/g, "&quot;").replace(/\n/g, "<br />")
            }

            function nt(t) {
                return t.replace(/&.*?;/g, "")
            }

            function it(e) {
                var n = [];
                return t.each(e, function (t, e) {
                    null != e && n.push(t + ":" + e)
                }), n.join(";")
            }

            function rt(e) {
                var n = [];
                return t.each(e, function (t, e) {
                    null != e && n.push(t + '="' + et(e) + '"')
                }), n.join(" ")
            }

            function st(t) {
                return t.charAt(0).toUpperCase() + t.slice(1)
            }

            function ot(t, e) {
                return t - e
            }

            function at(t) {
                return t % 1 == 0
            }

            function lt(t, e) {
                var n = t[e];
                return function () {
                    return n.apply(t, arguments)
                }
            }

            function ut(t, e, n) {
                var i, r, s, o, a, l = function () {
                    var u = +new Date - o;
                    u < e ? i = setTimeout(l, e - u) : (i = null, n || (a = t.apply(s, r), s = r = null))
                };
                return function () {
                    s = this, r = arguments, o = +new Date;
                    var u = n && !i;
                    return i || (i = setTimeout(l, e)), u && (a = t.apply(s, r), s = r = null), a
                }
            }

            function ct(n, i, r) {
                var s, o, a, l, u = n[0], c = 1 == n.length && "string" == typeof u;
                return e.isMoment(u) || q(u) || void 0 === u ? l = e.apply(null, n) : (s = !1, o = !1, c ? $t.test(u) ? (u += "-01", n = [u], s = !0, o = !0) : (a = Xt.exec(u)) && (s = !a[5], o = !0) : t.isArray(u) && (o = !0), l = i || s ? e.utc.apply(e, n) : e.apply(null, n), s ? (l._ambigTime = !0, l._ambigZone = !0) : r && (o ? l._ambigZone = !0 : c && l.utcOffset(u))), l._fullCalendar = !0, l
            }

            function ht(t) {
                return "en" !== t.locale() ? t.clone().locale("en") : t
            }

            function dt() {
            }

            function ft(t, e) {
                var n;
                return Q(e, "constructor") && (n = e.constructor), "function" != typeof n && (n = e.constructor = function () {
                    t.apply(this, arguments)
                }), n.prototype = Object.create(t.prototype), Z(e, n.prototype), Z(t, n), n
            }

            function gt(t, e) {
                t.then = function (n) {
                    return "function" == typeof n ? ce.resolve(n(e)) : t
                }
            }

            function pt(t) {
                t.then = function (e, n) {
                    return "function" == typeof n && n(), t
                }
            }

            function vt(t, e) {
                return !t && !e || !(!t || !e) && (t.component === e.component && mt(t, e) && mt(e, t))
            }

            function mt(t, e) {
                for (var n in t) if (!/^(component|left|right|top|bottom)$/.test(n) && t[n] !== e[n]) return !1;
                return !0
            }

            function yt(t) {
                this.items = t || []
            }

            function wt(n) {
                var i, r, s, o, a = Wt.dataAttrPrefix;
                return a && (a += "-"), i = n.data(a + "event") || null, i && (i = "object" == typeof i ? t.extend({}, i) : {}, r = i.start, null == r && (r = i.time), s = i.duration, o = i.stick, delete i.start, delete i.time, delete i.duration, delete i.stick), null == r && (r = n.data(a + "start")), null == r && (r = n.data(a + "time")), null == s && (s = n.data(a + "duration")), null == o && (o = n.data(a + "stick")), r = null != r ? e.duration(r) : null, s = null != s ? e.duration(s) : null, o = Boolean(o), {
                    eventProps: i,
                    startTime: r,
                    duration: s,
                    stick: o
                }
            }

            function Dt(t) {
                var e, n, i, r = [];
                for (e in t) for (n = t[e].eventInstances, i = 0; i < n.length; i++) r.push(n[i].toLegacy());
                return r
            }

            function bt(e, n) {
                function i(t) {
                    n = t
                }

                function r() {
                    n.layout ? (g ? g.empty() : g = this.el = t("<div class='fc-toolbar " + n.extraClasses + "'/>"), g.append(o("left")).append(o("right")).append(o("center")).append('<div class="fc-clear"/>')) : s()
                }

                function s() {
                    g && (g.remove(), g = f.el = null)
                }

                function o(i) {
                    var r = e.theme, s = t('<div class="fc-' + i + '"/>'), o = n.layout[i],
                        a = e.opt("customButtons") || {}, l = e.overrides.buttonText || {},
                        u = e.opt("buttonText") || {};
                    return o && t.each(o.split(" "), function (n) {
                        var i, o = t(), c = !0;
                        t.each(this.split(","), function (n, i) {
                            var s, h, d, f, g, v, m, y;
                            "title" == i ? (o = o.add(t("<h2>&nbsp;</h2>")), c = !1) : ((s = a[i]) ? (d = function (t) {
                                s.click && s.click.call(y[0], t)
                            }, (f = r.getCustomButtonIconClass(s)) || (f = r.getIconClass(i)) || (g = s.text)) : (h = e.getViewSpec(i)) ? (p.push(i), d = function () {
                                e.changeView(i)
                            }, (g = h.buttonTextOverride) || (f = r.getIconClass(i)) || (g = h.buttonTextDefault)) : e[i] && (d = function () {
                                e[i]()
                            }, (g = l[i]) || (f = r.getIconClass(i)) || (g = u[i])), d && (m = ["fc-" + i + "-button", r.getClass("button"), r.getClass("stateDefault")], g ? v = et(g) : f && (v = "<span class='" + f + "'></span>"), y = t('<button type="button" class="' + m.join(" ") + '">' + v + "</button>").click(function (t) {
                                y.hasClass(r.getClass("stateDisabled")) || (d(t), (y.hasClass(r.getClass("stateActive")) || y.hasClass(r.getClass("stateDisabled"))) && y.removeClass(r.getClass("stateHover")))
                            }).mousedown(function () {
                                y.not("." + r.getClass("stateActive")).not("." + r.getClass("stateDisabled")).addClass(r.getClass("stateDown"))
                            }).mouseup(function () {
                                y.removeClass(r.getClass("stateDown"))
                            }).hover(function () {
                                y.not("." + r.getClass("stateActive")).not("." + r.getClass("stateDisabled")).addClass(r.getClass("stateHover"))
                            }, function () {
                                y.removeClass(r.getClass("stateHover")).removeClass(r.getClass("stateDown"))
                            }), o = o.add(y)))
                        }), c && o.first().addClass(r.getClass("cornerLeft")).end().last().addClass(r.getClass("cornerRight")).end(), o.length > 1 ? (i = t("<div/>"), c && i.addClass(r.getClass("buttonGroup")), i.append(o), s.append(i)) : s.append(o)
                    }), s
                }

                function a(t) {
                    g && g.find("h2").text(t)
                }

                function l(t) {
                    g && g.find(".fc-" + t + "-button").addClass(e.theme.getClass("stateActive"))
                }

                function u(t) {
                    g && g.find(".fc-" + t + "-button").removeClass(e.theme.getClass("stateActive"))
                }

                function c(t) {
                    g && g.find(".fc-" + t + "-button").prop("disabled", !0).addClass(e.theme.getClass("stateDisabled"))
                }

                function h(t) {
                    g && g.find(".fc-" + t + "-button").prop("disabled", !1).removeClass(e.theme.getClass("stateDisabled"))
                }

                function d() {
                    return p
                }

                var f = this;
                f.setToolbarOptions = i, f.render = r, f.removeElement = s, f.updateTitle = a, f.activateButton = l, f.deactivateButton = u, f.disableButton = c, f.enableButton = h, f.getViewsWithButtons = d, f.el = null;
                var g, p = []
            }

            function Et(t, e, n) {
                var i;
                for (i = 0; i < t.length; i++) if (!e(t[i].eventInstance.toLegacy(), n ? n.toLegacy() : null)) return !1;
                return !0
            }

            function St(t, e) {
                var n, i, r, s, o = e.toLegacy();
                for (n = 0; n < t.length; n++) {
                    if (i = t[n].eventInstance, r = i.def, !1 === (s = r.getOverlap())) return !1;
                    if ("function" == typeof s && !s(i.toLegacy(), o)) return !1
                }
                return !0
            }

            function Ct(e, n) {
                return null == n ? e : t.isFunction(n) ? e.filter(n) : (n += "", e.filter(function (t) {
                    return t.id == n || t._id === n
                }))
            }

            function Rt(e) {
                t.each(Ge, function (t, n) {
                    null == e[t] && (e[t] = n(e))
                })
            }

            function Tt(t) {
                return e.localeData(t) || e.localeData("en")
            }

            function It(t, e) {
                var n, i, r = [], s = e.startMs;
                for (t.sort(Ht), n = 0; n < t.length; n++) i = t[n], i.startMs > s && r.push(new Ue(s, i.startMs)), i.endMs > s && (s = i.endMs);
                return s < e.endMs && r.push(new Ue(s, e.endMs)), r
            }

            function Ht(t, e) {
                return t.startMs - e.startMs
            }

            function Mt(t, e) {
                return t.getPrimitive() == e.getPrimitive()
            }

            function xt(t, e) {
                var n, i = [];
                for (n = 0; n < t.length; n++) i.push.apply(i, t[n].buildInstances(e));
                return i
            }

            function Pt(t) {
                return new en(t.dateProfile.unzonedRange, t.def, t)
            }

            function zt(t) {
                return new nn(new We(t.unzonedRange, t.eventDef.isAllDay()), t.eventDef, t.eventInstance)
            }

            function Ft(t) {
                return t.dateProfile.unzonedRange
            }

            function kt(t) {
                return t.componentFootprint
            }

            function Bt(t, e) {
                var n, i;
                for (n = 0; n < e.length; n++) if (i = e[n], i.leftCol <= t.rightCol && i.rightCol >= t.leftCol) return !0;
                return !1
            }

            function At(t, e) {
                return t.leftCol - e.leftCol
            }

            function Lt(t) {
                var e, n, i, r = [];
                for (e = 0; e < t.length; e++) {
                    for (n = t[e], i = 0; i < r.length && Vt(n, r[i]).length; i++) ;
                    n.level = i, (r[i] || (r[i] = [])).push(n)
                }
                return r
            }

            function Ot(t) {
                var e, n, i, r, s;
                for (e = 0; e < t.length; e++) for (n = t[e], i = 0; i < n.length; i++) for (r = n[i], r.forwardSegs = [], s = e + 1; s < t.length; s++) Vt(r, t[s], r.forwardSegs)
            }

            function Nt(t) {
                var e, n, i = t.forwardSegs, r = 0;
                if (void 0 === t.forwardPressure) {
                    for (e = 0; e < i.length; e++) n = i[e], Nt(n), r = Math.max(r, 1 + n.forwardPressure);
                    t.forwardPressure = r
                }
            }

            function Vt(t, e, n) {
                n = n || [];
                for (var i = 0; i < e.length; i++) Gt(t, e[i]) && n.push(e[i]);
                return n
            }

            function Gt(t, e) {
                return t.bottom > e.top && t.top < e.bottom
            }

            function Ut(t) {
                var e, n = [], i = [];
                for (e = 0; e < t.length; e++) t[e].componentFootprint.isAllDay ? n.push(t[e]) : i.push(t[e]);
                return {allDay: n, timed: i}
            }

            var Wt = t.fullCalendar = {version: "3.6.1", internalApiVersion: 11}, _t = Wt.views = {};
            t.fn.fullCalendar = function (e) {
                var n = Array.prototype.slice.call(arguments, 1), i = this;
                return this.each(function (r, s) {
                    var o, a = t(s), l = a.data("fullCalendar");
                    "string" == typeof e ? "getCalendar" === e ? r || (i = l) : "destroy" === e ? l && (l.destroy(), a.removeData("fullCalendar")) : l ? t.isFunction(l[e]) ? (o = l[e].apply(l, n), r || (i = o), "destroy" === e && a.removeData("fullCalendar")) : Wt.warn("'" + e + "' is an unknown FullCalendar method.") : Wt.warn("Attempting to call a FullCalendar method on an element with no calendar.") : l || (l = new Le(a, e), a.data("fullCalendar", l), l.render())
                }), i
            };
            var qt = ["header", "footer", "buttonText", "buttonIcons", "themeButtonIcons"];
            Wt.applyAll = $, Wt.debounce = ut, Wt.isInt = at, Wt.htmlEscape = et, Wt.cssToStr = it, Wt.proxy = lt, Wt.capitaliseFirstLetter = st, Wt.getOuterRect = d, Wt.getClientRect = f, Wt.getContentRect = g, Wt.getScrollbarWidths = p;
            var Yt = null;
            Wt.preventDefault = T, Wt.intersectRects = I, Wt.parseFieldSpecs = P, Wt.compareByFieldSpecs = z, Wt.compareByFieldSpec = F, Wt.flexibleCompare = k, Wt.computeGreatestUnit = O, Wt.divideRangeByDuration = G, Wt.divideDurationByDuration = U, Wt.multiplyDuration = W, Wt.durationHasTime = _;
            var jt = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
                Zt = ["year", "month", "week", "day", "hour", "minute", "second", "millisecond"];
            Wt.log = function () {
                var t = window.console;
                if (t && t.log) return t.log.apply(t, arguments)
            }, Wt.warn = function () {
                var t = window.console;
                return t && t.warn ? t.warn.apply(t, arguments) : Wt.log.apply(Wt, arguments)
            };
            var Qt = {}.hasOwnProperty;
            Wt.removeExact = K;
            var $t = /^\s*\d{4}-\d\d$/,
                Xt = /^\s*\d{4}-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?)?$/,
                Kt = e.fn, Jt = t.extend({}, Kt), te = e.momentProperties;
            te.push("_fullCalendar"), te.push("_ambigTime"), te.push("_ambigZone"), Wt.moment = function () {
                return ct(arguments)
            }, Wt.moment.utc = function () {
                var t = ct(arguments, !0);
                return t.hasTime() && t.utc(), t
            }, Wt.moment.parseZone = function () {
                return ct(arguments, !0, !0)
            }, Kt.week = Kt.weeks = function (t) {
                var e = this._locale._fullCalendar_weekCalc;
                return null == t && "function" == typeof e ? e(this) : "ISO" === e ? Jt.isoWeek.apply(this, arguments) : Jt.week.apply(this, arguments)
            }, Kt.time = function (t) {
                if (!this._fullCalendar) return Jt.time.apply(this, arguments);
                if (null == t) return e.duration({
                    hours: this.hours(),
                    minutes: this.minutes(),
                    seconds: this.seconds(),
                    milliseconds: this.milliseconds()
                });
                this._ambigTime = !1, e.isDuration(t) || e.isMoment(t) || (t = e.duration(t));
                var n = 0;
                return e.isDuration(t) && (n = 24 * Math.floor(t.asDays())), this.hours(n + t.hours()).minutes(t.minutes()).seconds(t.seconds()).milliseconds(t.milliseconds())
            }, Kt.stripTime = function () {
                return this._ambigTime || (this.utc(!0), this.set({
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                    ms: 0
                }), this._ambigTime = !0, this._ambigZone = !0), this
            }, Kt.hasTime = function () {
                return !this._ambigTime
            }, Kt.stripZone = function () {
                var t;
                return this._ambigZone || (t = this._ambigTime, this.utc(!0), this._ambigTime = t || !1, this._ambigZone = !0), this
            }, Kt.hasZone = function () {
                return !this._ambigZone
            }, Kt.local = function (t) {
                return Jt.local.call(this, this._ambigZone || t), this._ambigTime = !1, this._ambigZone = !1, this
            }, Kt.utc = function (t) {
                return Jt.utc.call(this, t), this._ambigTime = !1, this._ambigZone = !1, this
            }, Kt.utcOffset = function (t) {
                return null != t && (this._ambigTime = !1, this._ambigZone = !1), Jt.utcOffset.apply(this, arguments)
            }, Kt.format = function () {
                return this._fullCalendar && arguments[0] ? ee(this, arguments[0]) : this._ambigTime ? ie(ht(this), "YYYY-MM-DD") : this._ambigZone ? ie(ht(this), "YYYY-MM-DD[T]HH:mm:ss") : this._fullCalendar ? ie(ht(this)) : Jt.format.apply(this, arguments)
            }, Kt.toISOString = function () {
                return this._ambigTime ? ie(ht(this), "YYYY-MM-DD") : this._ambigZone ? ie(ht(this), "YYYY-MM-DD[T]HH:mm:ss") : this._fullCalendar ? Jt.toISOString.apply(ht(this), arguments) : Jt.toISOString.apply(this, arguments)
            }, function () {
                function t(t, e) {
                    return c(r(e).fakeFormatString, t)
                }

                function e(t, e) {
                    return Jt.format.call(t, e)
                }

                function n(t, e, n, s, o) {
                    var a;
                    return t = Wt.moment.parseZone(t), e = Wt.moment.parseZone(e), a = t.localeData(), n = a.longDateFormat(n) || n, i(r(n), t, e, s || " - ", o)
                }

                function i(t, e, n, i, r) {
                    var s, o, a, l = t.sameUnits, u = e.clone().stripZone(), c = n.clone().stripZone(),
                        f = h(t.fakeFormatString, e), g = h(t.fakeFormatString, n), p = "", v = "", m = "", y = "",
                        w = "";
                    for (s = 0; s < l.length && (!l[s] || u.isSame(c, l[s])); s++) p += f[s];
                    for (o = l.length - 1; o > s && (!l[o] || u.isSame(c, l[o])) && (o - 1 !== s || "." !== f[o]); o--) v = f[o] + v;
                    for (a = s; a <= o; a++) m += f[a], y += g[a];
                    return (m || y) && (w = r ? y + i + m : m + i + y), d(p + w + v)
                }

                function r(t) {
                    return D[t] || (D[t] = s(t))
                }

                function s(t) {
                    var e = o(t);
                    return {fakeFormatString: l(e), sameUnits: u(e)}
                }

                function o(t) {
                    for (var e, n = [], i = /\[([^\]]*)\]|\(([^\)]*)\)|(LTS|LT|(\w)\4*o?)|([^\w\[\(]+)/g; e = i.exec(t);) e[1] ? n.push.apply(n, a(e[1])) : e[2] ? n.push({maybe: o(e[2])}) : e[3] ? n.push({token: e[3]}) : e[5] && n.push.apply(n, a(e[5]));
                    return n
                }

                function a(t) {
                    return ". " === t ? [".", " "] : [t]
                }

                function l(t) {
                    var e, n, i = [];
                    for (e = 0; e < t.length; e++) n = t[e], "string" == typeof n ? i.push("[" + n + "]") : n.token ? n.token in y ? i.push(p + "[" + n.token + "]") : i.push(n.token) : n.maybe && i.push(v + l(n.maybe) + v);
                    return i.join(g)
                }

                function u(t) {
                    var e, n, i, r = [];
                    for (e = 0; e < t.length; e++) n = t[e], n.token ? (i = w[n.token.charAt(0)], r.push(i ? i.unit : "second")) : n.maybe ? r.push.apply(r, u(n.maybe)) : r.push(null);
                    return r
                }

                function c(t, e) {
                    return d(h(t, e).join(""))
                }

                function h(t, n) {
                    var i, r, s = [], o = e(n, t), a = o.split(g);
                    for (i = 0; i < a.length; i++) r = a[i], r.charAt(0) === p ? s.push(y[r.substring(1)](n)) : s.push(r);
                    return s
                }

                function d(t) {
                    return t.replace(m, function (t, e) {
                        return e.match(/[1-9]/) ? e : ""
                    })
                }

                function f(t) {
                    var e, n, i, r, s = o(t);
                    for (e = 0; e < s.length; e++) n = s[e], n.token && (i = w[n.token.charAt(0)]) && (!r || i.value > r.value) && (r = i);
                    return r ? r.unit : null
                }

                Wt.formatDate = t, Wt.formatRange = n, Wt.oldMomentFormat = e, Wt.queryMostGranularFormatUnit = f;
                var g = "\v", p = "", v = "", m = new RegExp(v + "([^" + v + "]*)" + v, "g"), y = {
                    t: function (t) {
                        return e(t, "a").charAt(0)
                    }, T: function (t) {
                        return e(t, "A").charAt(0)
                    }
                }, w = {
                    Y: {value: 1, unit: "year"},
                    M: {value: 2, unit: "month"},
                    W: {value: 3, unit: "week"},
                    w: {value: 3, unit: "week"},
                    D: {value: 4, unit: "day"},
                    d: {value: 4, unit: "day"}
                }, D = {}
            }();
            var ee = Wt.formatDate, ne = Wt.formatRange, ie = Wt.oldMomentFormat;
            Wt.Class = dt, dt.extend = function () {
                var t, e = {};
                for (t = 0; t < arguments.length; t++) Z(arguments[t], e);
                return ft(this, e)
            }, dt.mixin = function (t) {
                Z(t, this.prototype)
            };
            var re = Wt.EmitterMixin = {
                on: function (e, n) {
                    return t(this).on(e, this._prepareIntercept(n)), this
                }, one: function (e, n) {
                    return t(this).one(e, this._prepareIntercept(n)), this
                }, _prepareIntercept: function (e) {
                    var n = function (t, n) {
                        return e.apply(n.context || this, n.args || [])
                    };
                    return e.guid || (e.guid = t.guid++), n.guid = e.guid, n
                }, off: function (e, n) {
                    return t(this).off(e, n), this
                }, trigger: function (e) {
                    var n = Array.prototype.slice.call(arguments, 1);
                    return t(this).triggerHandler(e, {args: n}), this
                }, triggerWith: function (e, n, i) {
                    return t(this).triggerHandler(e, {context: n, args: i}), this
                }, hasHandlers: function (e) {
                    var n = t._data(this, "events");
                    return n && n[e] && n[e].length > 0
                }
            }, se = Wt.ListenerMixin = function () {
                var e = 0;
                return {
                    listenerId: null, listenTo: function (e, n, i) {
                        if ("object" == typeof n) for (var r in n) n.hasOwnProperty(r) && this.listenTo(e, r, n[r]); else "string" == typeof n && e.on(n + "." + this.getListenerNamespace(), t.proxy(i, this))
                    }, stopListeningTo: function (t, e) {
                        t.off((e || "") + "." + this.getListenerNamespace())
                    }, getListenerNamespace: function () {
                        return null == this.listenerId && (this.listenerId = e++), "_listener" + this.listenerId
                    }
                }
            }(), oe = {
                standardPropMap: {}, applyProps: function (t) {
                    var e, n = this.standardPropMap, i = {}, r = {};
                    for (e in t) !0 === n[e] ? this[e] = t[e] : !1 === n[e] ? i[e] = t[e] : r[e] = t[e];
                    return this.applyMiscProps(r), this.applyManualStandardProps(i)
                }, applyManualStandardProps: function (t) {
                    return !0
                }, applyMiscProps: function (t) {
                }, isStandardProp: function (t) {
                    return t in this.standardPropMap
                }
            }, ae = function (t) {
                var e = this.prototype;
                e.hasOwnProperty("standardPropMap") || (e.standardPropMap = Object.create(e.standardPropMap)), Z(t, e.standardPropMap)
            }, le = function (t, e) {
                var n, i = this.prototype.standardPropMap;
                for (n in i) null != t[n] && !0 === i[n] && (e[n] = t[n])
            }, ue = dt.extend(re, se, {
                _props: null, _watchers: null, _globalWatchArgs: {}, constructor: function () {
                    this._watchers = {}, this._props = {}, this.applyGlobalWatchers(), this.constructed()
                }, constructed: function () {
                }, applyGlobalWatchers: function () {
                    var t, e = this._globalWatchArgs;
                    for (t in e) this.watch.apply(this, e[t])
                }, has: function (t) {
                    return t in this._props
                }, get: function (t) {
                    return void 0 === t ? this._props : this._props[t]
                }, set: function (t, e) {
                    var n;
                    "string" == typeof t ? (n = {}, n[t] = void 0 === e ? null : e) : n = t, this.setProps(n)
                }, reset: function (t) {
                    var e, n = this._props, i = {};
                    for (e in n) i[e] = void 0;
                    for (e in t) i[e] = t[e];
                    this.setProps(i)
                }, unset: function (t) {
                    var e, n, i = {};
                    for (e = "string" == typeof t ? [t] : t, n = 0; n < e.length; n++) i[e[n]] = void 0;
                    this.setProps(i)
                }, setProps: function (t) {
                    var e, n, i = {}, r = 0;
                    for (e in t) "object" != typeof (n = t[e]) && n === this._props[e] || (i[e] = n, r++);
                    if (r) {
                        this.trigger("before:batchChange", i);
                        for (e in i) n = i[e], this.trigger("before:change", e, n), this.trigger("before:change:" + e, n);
                        for (e in i) n = i[e], void 0 === n ? delete this._props[e] : this._props[e] = n, this.trigger("change:" + e, n), this.trigger("change", e, n);
                        this.trigger("batchChange", i)
                    }
                }, watch: function (t, e, n, i) {
                    var r = this;
                    this.unwatch(t), this._watchers[t] = this._watchDeps(e, function (e) {
                        var i = n.call(r, e);
                        i && i.then ? (r.unset(t), i.then(function (e) {
                            r.set(t, e)
                        })) : r.set(t, i)
                    }, function (e) {
                        r.unset(t), i && i.call(r, e)
                    })
                }, unwatch: function (t) {
                    var e = this._watchers[t];
                    e && (delete this._watchers[t], e.teardown())
                }, _watchDeps: function (t, e, n) {
                    function i(t, e, i) {
                        1 === ++a && u === l && (d = !0, n(c), d = !1)
                    }

                    function r(t, n, i) {
                        void 0 === n ? (i || void 0 === c[t] || u--, delete c[t]) : (i || void 0 !== c[t] || u++, c[t] = n), --a || u === l && (d || e(c))
                    }

                    function s(t, e) {
                        o.on(t, e), h.push([t, e])
                    }

                    var o = this, a = 0, l = t.length, u = 0, c = {}, h = [], d = !1;
                    return t.forEach(function (t) {
                        var e = !1;
                        "?" === t.charAt(0) && (t = t.substring(1), e = !0), s("before:change:" + t, function (n) {
                            i(t, n, e)
                        }), s("change:" + t, function (n) {
                            r(t, n, e)
                        })
                    }), t.forEach(function (t) {
                        var e = !1;
                        "?" === t.charAt(0) && (t = t.substring(1), e = !0), o.has(t) ? (c[t] = o.get(t), u++) : e && u++
                    }), u === l && e(c), {
                        teardown: function () {
                            for (var t = 0; t < h.length; t++) o.off(h[t][0], h[t][1]);
                            h = null, u === l && n()
                        }, flash: function () {
                            u === l && (n(), e(c))
                        }
                    }
                }, flash: function (t) {
                    var e = this._watchers[t];
                    e && e.flash()
                }
            });
            ue.watch = function (t) {
                this.prototype.hasOwnProperty("_globalWatchArgs") || (this.prototype._globalWatchArgs = Object.create(this.prototype._globalWatchArgs)), this.prototype._globalWatchArgs[t] = arguments
            }, Wt.Model = ue;
            var ce = {
                construct: function (e) {
                    var n = t.Deferred(), i = n.promise();
                    return "function" == typeof e && e(function (t) {
                        n.resolve(t), gt(i, t)
                    }, function () {
                        n.reject(), pt(i)
                    }), i
                }, resolve: function (e) {
                    var n = t.Deferred().resolve(e), i = n.promise();
                    return gt(i, e), i
                }, reject: function () {
                    var e = t.Deferred().reject(), n = e.promise();
                    return pt(n), n
                }
            };
            Wt.Promise = ce;
            var he = dt.extend(re, {
                q: null, isPaused: !1, isRunning: !1, constructor: function () {
                    this.q = []
                }, queue: function () {
                    this.q.push.apply(this.q, arguments), this.tryStart()
                }, pause: function () {
                    this.isPaused = !0
                }, resume: function () {
                    this.isPaused = !1, this.tryStart()
                }, getIsIdle: function () {
                    return !this.isRunning && !this.isPaused
                }, tryStart: function () {
                    !this.isRunning && this.canRunNext() && (this.isRunning = !0, this.trigger("start"), this.runRemaining())
                }, canRunNext: function () {
                    return !this.isPaused && this.q.length
                }, runRemaining: function () {
                    var t, e, n = this;
                    do {
                        if (t = this.q.shift(), (e = this.runTask(t)) && e.then) return void e.then(function () {
                            n.canRunNext() && n.runRemaining()
                        })
                    } while (this.canRunNext());
                    this.trigger("stop"), this.isRunning = !1, this.tryStart()
                }, runTask: function (t) {
                    return t()
                }
            });
            Wt.TaskQueue = he;
            var de = he.extend({
                waitsByNamespace: null, waitNamespace: null, waitId: null, constructor: function (t) {
                    he.call(this), this.waitsByNamespace = t || {}
                }, queue: function (t, e, n) {
                    var i, r = {func: t, namespace: e, type: n};
                    e && (i = this.waitsByNamespace[e]), this.waitNamespace && (e === this.waitNamespace && null != i ? this.delayWait(i) : (this.clearWait(), this.tryStart())), this.compoundTask(r) && (this.waitNamespace || null == i ? this.tryStart() : this.startWait(e, i))
                }, startWait: function (t, e) {
                    this.waitNamespace = t, this.spawnWait(e)
                }, delayWait: function (t) {
                    clearTimeout(this.waitId), this.spawnWait(t)
                }, spawnWait: function (t) {
                    var e = this;
                    this.waitId = setTimeout(function () {
                        e.waitNamespace = null, e.tryStart()
                    }, t)
                }, clearWait: function () {
                    this.waitNamespace && (clearTimeout(this.waitId), this.waitId = null, this.waitNamespace = null)
                }, canRunNext: function () {
                    if (!he.prototype.canRunNext.apply(this, arguments)) return !1;
                    if (this.waitNamespace) {
                        for (var t = this.q, e = 0; e < t.length; e++) if (t[e].namespace !== this.waitNamespace) return !0;
                        return !1
                    }
                    return !0
                }, runTask: function (t) {
                    t.func()
                }, compoundTask: function (t) {
                    var e, n, i = this.q, r = !0;
                    if (t.namespace && "destroy" === t.type) for (e = i.length - 1; e >= 0; e--) switch (n = i[e], n.type) {
                        case"init":
                            r = !1;
                        case"add":
                        case"remove":
                            i.splice(e, 1)
                    }
                    return r && i.push(t), r
                }
            });
            Wt.RenderQueue = de;
            var fe = dt.extend(se, {
                isHidden: !0, options: null, el: null, margin: 10, constructor: function (t) {
                    this.options = t || {}
                }, show: function () {
                    this.isHidden && (this.el || this.render(), this.el.show(), this.position(), this.isHidden = !1, this.trigger("show"))
                }, hide: function () {
                    this.isHidden || (this.el.hide(), this.isHidden = !0, this.trigger("hide"))
                }, render: function () {
                    var e = this, n = this.options;
                    this.el = t('<div class="fc-popover"/>').addClass(n.className || "").css({
                        top: 0,
                        left: 0
                    }).append(n.content).appendTo(n.parentEl), this.el.on("click", ".fc-close", function () {
                        e.hide()
                    }), n.autoHide && this.listenTo(t(document), "mousedown", this.documentMousedown)
                }, documentMousedown: function (e) {
                    this.el && !t(e.target).closest(this.el).length && this.hide()
                }, removeElement: function () {
                    this.hide(), this.el && (this.el.remove(), this.el = null), this.stopListeningTo(t(document), "mousedown")
                }, position: function () {
                    var e, n, i, r, s, o = this.options, a = this.el.offsetParent().offset(), l = this.el.outerWidth(),
                        u = this.el.outerHeight(), c = t(window), d = h(this.el);
                    r = o.top || 0, s = void 0 !== o.left ? o.left : void 0 !== o.right ? o.right - l : 0, d.is(window) || d.is(document) ? (d = c, e = 0, n = 0) : (i = d.offset(), e = i.top, n = i.left), e += c.scrollTop(), n += c.scrollLeft(), !1 !== o.viewportConstrain && (r = Math.min(r, e + d.outerHeight() - u - this.margin), r = Math.max(r, e + this.margin), s = Math.min(s, n + d.outerWidth() - l - this.margin), s = Math.max(s, n + this.margin)), this.el.css({
                        top: r - a.top,
                        left: s - a.left
                    })
                }, trigger: function (t) {
                    this.options[t] && this.options[t].apply(this, Array.prototype.slice.call(arguments, 1))
                }
            }), ge = Wt.CoordCache = dt.extend({
                els: null,
                forcedOffsetParentEl: null,
                origin: null,
                boundingRect: null,
                isHorizontal: !1,
                isVertical: !1,
                lefts: null,
                rights: null,
                tops: null,
                bottoms: null,
                constructor: function (e) {
                    this.els = t(e.els), this.isHorizontal = e.isHorizontal, this.isVertical = e.isVertical, this.forcedOffsetParentEl = e.offsetParent ? t(e.offsetParent) : null
                },
                build: function () {
                    var t = this.forcedOffsetParentEl;
                    !t && this.els.length > 0 && (t = this.els.eq(0).offsetParent()), this.origin = t ? t.offset() : null, this.boundingRect = this.queryBoundingRect(), this.isHorizontal && this.buildElHorizontals(), this.isVertical && this.buildElVerticals()
                },
                clear: function () {
                    this.origin = null, this.boundingRect = null, this.lefts = null, this.rights = null, this.tops = null, this.bottoms = null
                },
                ensureBuilt: function () {
                    this.origin || this.build()
                },
                buildElHorizontals: function () {
                    var e = [], n = [];
                    this.els.each(function (i, r) {
                        var s = t(r), o = s.offset().left, a = s.outerWidth();
                        e.push(o), n.push(o + a)
                    }), this.lefts = e, this.rights = n
                },
                buildElVerticals: function () {
                    var e = [], n = [];
                    this.els.each(function (i, r) {
                        var s = t(r), o = s.offset().top, a = s.outerHeight();
                        e.push(o), n.push(o + a)
                    }), this.tops = e, this.bottoms = n
                },
                getHorizontalIndex: function (t) {
                    this.ensureBuilt();
                    var e, n = this.lefts, i = this.rights, r = n.length;
                    for (e = 0; e < r; e++) if (t >= n[e] && t < i[e]) return e
                },
                getVerticalIndex: function (t) {
                    this.ensureBuilt();
                    var e, n = this.tops, i = this.bottoms, r = n.length;
                    for (e = 0; e < r; e++) if (t >= n[e] && t < i[e]) return e
                },
                getLeftOffset: function (t) {
                    return this.ensureBuilt(), this.lefts[t]
                },
                getLeftPosition: function (t) {
                    return this.ensureBuilt(), this.lefts[t] - this.origin.left
                },
                getRightOffset: function (t) {
                    return this.ensureBuilt(), this.rights[t]
                },
                getRightPosition: function (t) {
                    return this.ensureBuilt(), this.rights[t] - this.origin.left
                },
                getWidth: function (t) {
                    return this.ensureBuilt(), this.rights[t] - this.lefts[t]
                },
                getTopOffset: function (t) {
                    return this.ensureBuilt(), this.tops[t]
                },
                getTopPosition: function (t) {
                    return this.ensureBuilt(), this.tops[t] - this.origin.top
                },
                getBottomOffset: function (t) {
                    return this.ensureBuilt(), this.bottoms[t]
                },
                getBottomPosition: function (t) {
                    return this.ensureBuilt(), this.bottoms[t] - this.origin.top
                },
                getHeight: function (t) {
                    return this.ensureBuilt(), this.bottoms[t] - this.tops[t]
                },
                queryBoundingRect: function () {
                    var t;
                    return this.els.length > 0 && (t = h(this.els.eq(0)), !t.is(document)) ? f(t) : null
                },
                isPointInBounds: function (t, e) {
                    return this.isLeftInBounds(t) && this.isTopInBounds(e)
                },
                isLeftInBounds: function (t) {
                    return !this.boundingRect || t >= this.boundingRect.left && t < this.boundingRect.right
                },
                isTopInBounds: function (t) {
                    return !this.boundingRect || t >= this.boundingRect.top && t < this.boundingRect.bottom
                }
            }), pe = Wt.DragListener = dt.extend(se, {
                options: null,
                subjectEl: null,
                originX: null,
                originY: null,
                scrollEl: null,
                isInteracting: !1,
                isDistanceSurpassed: !1,
                isDelayEnded: !1,
                isDragging: !1,
                isTouch: !1,
                isGeneric: !1,
                delay: null,
                delayTimeoutId: null,
                minDistance: null,
                shouldCancelTouchScroll: !0,
                scrollAlwaysKills: !1,
                constructor: function (t) {
                    this.options = t || {}
                },
                startInteraction: function (e, n) {
                    if ("mousedown" === e.type) {
                        if (me.get().shouldIgnoreMouse()) return;
                        if (!D(e)) return;
                        e.preventDefault()
                    }
                    this.isInteracting || (n = n || {}, this.delay = tt(n.delay, this.options.delay, 0), this.minDistance = tt(n.distance, this.options.distance, 0), this.subjectEl = this.options.subjectEl, C(t("body")), this.isInteracting = !0, this.isTouch = S(e), this.isGeneric = "dragstart" === e.type, this.isDelayEnded = !1, this.isDistanceSurpassed = !1, this.originX = b(e), this.originY = E(e), this.scrollEl = h(t(e.target)), this.bindHandlers(), this.initAutoScroll(), this.handleInteractionStart(e), this.startDelay(e), this.minDistance || this.handleDistanceSurpassed(e))
                },
                handleInteractionStart: function (t) {
                    this.trigger("interactionStart", t)
                },
                endInteraction: function (e, n) {
                    this.isInteracting && (this.endDrag(e), this.delayTimeoutId && (clearTimeout(this.delayTimeoutId), this.delayTimeoutId = null), this.destroyAutoScroll(), this.unbindHandlers(), this.isInteracting = !1, this.handleInteractionEnd(e, n), R(t("body")))
                },
                handleInteractionEnd: function (t, e) {
                    this.trigger("interactionEnd", t, e || !1)
                },
                bindHandlers: function () {
                    var e = me.get();
                    this.isGeneric ? this.listenTo(t(document), {
                        drag: this.handleMove,
                        dragstop: this.endInteraction
                    }) : this.isTouch ? this.listenTo(e, {
                        touchmove: this.handleTouchMove,
                        touchend: this.endInteraction,
                        scroll: this.handleTouchScroll
                    }) : this.listenTo(e, {
                        mousemove: this.handleMouseMove,
                        mouseup: this.endInteraction
                    }), this.listenTo(e, {selectstart: T, contextmenu: T})
                },
                unbindHandlers: function () {
                    this.stopListeningTo(me.get()), this.stopListeningTo(t(document))
                },
                startDrag: function (t, e) {
                    this.startInteraction(t, e), this.isDragging || (this.isDragging = !0,
                        this.handleDragStart(t))
                },
                handleDragStart: function (t) {
                    this.trigger("dragStart", t)
                },
                handleMove: function (t) {
                    var e = b(t) - this.originX, n = E(t) - this.originY, i = this.minDistance;
                    this.isDistanceSurpassed || e * e + n * n >= i * i && this.handleDistanceSurpassed(t), this.isDragging && this.handleDrag(e, n, t)
                },
                handleDrag: function (t, e, n) {
                    this.trigger("drag", t, e, n), this.updateAutoScroll(n)
                },
                endDrag: function (t) {
                    this.isDragging && (this.isDragging = !1, this.handleDragEnd(t))
                },
                handleDragEnd: function (t) {
                    this.trigger("dragEnd", t)
                },
                startDelay: function (t) {
                    var e = this;
                    this.delay ? this.delayTimeoutId = setTimeout(function () {
                        e.handleDelayEnd(t)
                    }, this.delay) : this.handleDelayEnd(t)
                },
                handleDelayEnd: function (t) {
                    this.isDelayEnded = !0, this.isDistanceSurpassed && this.startDrag(t)
                },
                handleDistanceSurpassed: function (t) {
                    this.isDistanceSurpassed = !0, this.isDelayEnded && this.startDrag(t)
                },
                handleTouchMove: function (t) {
                    this.isDragging && this.shouldCancelTouchScroll && t.preventDefault(), this.handleMove(t)
                },
                handleMouseMove: function (t) {
                    this.handleMove(t)
                },
                handleTouchScroll: function (t) {
                    this.isDragging && !this.scrollAlwaysKills || this.endInteraction(t, !0)
                },
                trigger: function (t) {
                    this.options[t] && this.options[t].apply(this, Array.prototype.slice.call(arguments, 1)), this["_" + t] && this["_" + t].apply(this, Array.prototype.slice.call(arguments, 1))
                }
            });
            pe.mixin({
                isAutoScroll: !1,
                scrollBounds: null,
                scrollTopVel: null,
                scrollLeftVel: null,
                scrollIntervalId: null,
                scrollSensitivity: 30,
                scrollSpeed: 200,
                scrollIntervalMs: 50,
                initAutoScroll: function () {
                    var t = this.scrollEl;
                    this.isAutoScroll = this.options.scroll && t && !t.is(window) && !t.is(document), this.isAutoScroll && this.listenTo(t, "scroll", ut(this.handleDebouncedScroll, 100))
                },
                destroyAutoScroll: function () {
                    this.endAutoScroll(), this.isAutoScroll && this.stopListeningTo(this.scrollEl, "scroll")
                },
                computeScrollBounds: function () {
                    this.isAutoScroll && (this.scrollBounds = d(this.scrollEl))
                },
                updateAutoScroll: function (t) {
                    var e, n, i, r, s = this.scrollSensitivity, o = this.scrollBounds, a = 0, l = 0;
                    o && (e = (s - (E(t) - o.top)) / s, n = (s - (o.bottom - E(t))) / s, i = (s - (b(t) - o.left)) / s, r = (s - (o.right - b(t))) / s, e >= 0 && e <= 1 ? a = e * this.scrollSpeed * -1 : n >= 0 && n <= 1 && (a = n * this.scrollSpeed), i >= 0 && i <= 1 ? l = i * this.scrollSpeed * -1 : r >= 0 && r <= 1 && (l = r * this.scrollSpeed)), this.setScrollVel(a, l)
                },
                setScrollVel: function (t, e) {
                    this.scrollTopVel = t, this.scrollLeftVel = e, this.constrainScrollVel(), !this.scrollTopVel && !this.scrollLeftVel || this.scrollIntervalId || (this.scrollIntervalId = setInterval(lt(this, "scrollIntervalFunc"), this.scrollIntervalMs))
                },
                constrainScrollVel: function () {
                    var t = this.scrollEl;
                    this.scrollTopVel < 0 ? t.scrollTop() <= 0 && (this.scrollTopVel = 0) : this.scrollTopVel > 0 && t.scrollTop() + t[0].clientHeight >= t[0].scrollHeight && (this.scrollTopVel = 0), this.scrollLeftVel < 0 ? t.scrollLeft() <= 0 && (this.scrollLeftVel = 0) : this.scrollLeftVel > 0 && t.scrollLeft() + t[0].clientWidth >= t[0].scrollWidth && (this.scrollLeftVel = 0)
                },
                scrollIntervalFunc: function () {
                    var t = this.scrollEl, e = this.scrollIntervalMs / 1e3;
                    this.scrollTopVel && t.scrollTop(t.scrollTop() + this.scrollTopVel * e), this.scrollLeftVel && t.scrollLeft(t.scrollLeft() + this.scrollLeftVel * e), this.constrainScrollVel(), this.scrollTopVel || this.scrollLeftVel || this.endAutoScroll()
                },
                endAutoScroll: function () {
                    this.scrollIntervalId && (clearInterval(this.scrollIntervalId), this.scrollIntervalId = null, this.handleScrollEnd())
                },
                handleDebouncedScroll: function () {
                    this.scrollIntervalId || this.handleScrollEnd()
                },
                handleScrollEnd: function () {
                }
            });
            var ve = pe.extend({
                component: null, origHit: null, hit: null, coordAdjust: null, constructor: function (t, e) {
                    pe.call(this, e), this.component = t
                }, handleInteractionStart: function (t) {
                    var e, n, i, r = this.subjectEl;
                    this.component.hitsNeeded(), this.computeScrollBounds(), t ? (n = {
                        left: b(t),
                        top: E(t)
                    }, i = n, r && (e = d(r), i = H(i, e)), this.origHit = this.queryHit(i.left, i.top), r && this.options.subjectCenter && (this.origHit && (e = I(this.origHit, e) || e), i = M(e)), this.coordAdjust = x(i, n)) : (this.origHit = null, this.coordAdjust = null), pe.prototype.handleInteractionStart.apply(this, arguments)
                }, handleDragStart: function (t) {
                    var e;
                    pe.prototype.handleDragStart.apply(this, arguments), (e = this.queryHit(b(t), E(t))) && this.handleHitOver(e)
                }, handleDrag: function (t, e, n) {
                    var i;
                    pe.prototype.handleDrag.apply(this, arguments), i = this.queryHit(b(n), E(n)), vt(i, this.hit) || (this.hit && this.handleHitOut(), i && this.handleHitOver(i))
                }, handleDragEnd: function () {
                    this.handleHitDone(), pe.prototype.handleDragEnd.apply(this, arguments)
                }, handleHitOver: function (t) {
                    var e = vt(t, this.origHit);
                    this.hit = t, this.trigger("hitOver", this.hit, e, this.origHit)
                }, handleHitOut: function () {
                    this.hit && (this.trigger("hitOut", this.hit), this.handleHitDone(), this.hit = null)
                }, handleHitDone: function () {
                    this.hit && this.trigger("hitDone", this.hit)
                }, handleInteractionEnd: function () {
                    pe.prototype.handleInteractionEnd.apply(this, arguments), this.origHit = null, this.hit = null, this.component.hitsNotNeeded()
                }, handleScrollEnd: function () {
                    pe.prototype.handleScrollEnd.apply(this, arguments), this.isDragging && (this.component.releaseHits(), this.component.prepareHits())
                }, queryHit: function (t, e) {
                    return this.coordAdjust && (t += this.coordAdjust.left, e += this.coordAdjust.top), this.component.queryHit(t, e)
                }
            });
            Wt.touchMouseIgnoreWait = 500;
            var me = dt.extend(se, re, {
                isTouching: !1, mouseIgnoreDepth: 0, handleScrollProxy: null, bind: function () {
                    var e = this;
                    this.listenTo(t(document), {
                        touchstart: this.handleTouchStart,
                        touchcancel: this.handleTouchCancel,
                        touchend: this.handleTouchEnd,
                        mousedown: this.handleMouseDown,
                        mousemove: this.handleMouseMove,
                        mouseup: this.handleMouseUp,
                        click: this.handleClick,
                        selectstart: this.handleSelectStart,
                        contextmenu: this.handleContextMenu
                    }), window.addEventListener("touchmove", this.handleTouchMoveProxy = function (n) {
                        e.handleTouchMove(t.Event(n))
                    }, {passive: !1}), window.addEventListener("scroll", this.handleScrollProxy = function (n) {
                        e.handleScroll(t.Event(n))
                    }, !0)
                }, unbind: function () {
                    this.stopListeningTo(t(document)), window.removeEventListener("touchmove", this.handleTouchMoveProxy), window.removeEventListener("scroll", this.handleScrollProxy, !0)
                }, handleTouchStart: function (t) {
                    this.stopTouch(t, !0), this.isTouching = !0, this.trigger("touchstart", t)
                }, handleTouchMove: function (t) {
                    this.isTouching && this.trigger("touchmove", t)
                }, handleTouchCancel: function (t) {
                    this.isTouching && (this.trigger("touchcancel", t), this.stopTouch(t))
                }, handleTouchEnd: function (t) {
                    this.stopTouch(t)
                }, handleMouseDown: function (t) {
                    this.shouldIgnoreMouse() || this.trigger("mousedown", t)
                }, handleMouseMove: function (t) {
                    this.shouldIgnoreMouse() || this.trigger("mousemove", t)
                }, handleMouseUp: function (t) {
                    this.shouldIgnoreMouse() || this.trigger("mouseup", t)
                }, handleClick: function (t) {
                    this.shouldIgnoreMouse() || this.trigger("click", t)
                }, handleSelectStart: function (t) {
                    this.trigger("selectstart", t)
                }, handleContextMenu: function (t) {
                    this.trigger("contextmenu", t)
                }, handleScroll: function (t) {
                    this.trigger("scroll", t)
                }, stopTouch: function (t, e) {
                    this.isTouching && (this.isTouching = !1, this.trigger("touchend", t), e || this.startTouchMouseIgnore())
                }, startTouchMouseIgnore: function () {
                    var t = this, e = Wt.touchMouseIgnoreWait;
                    e && (this.mouseIgnoreDepth++, setTimeout(function () {
                        t.mouseIgnoreDepth--
                    }, e))
                }, shouldIgnoreMouse: function () {
                    return this.isTouching || Boolean(this.mouseIgnoreDepth)
                }
            });
            !function () {
                var t = null, e = 0;
                me.get = function () {
                    return t || (t = new me, t.bind()), t
                }, me.needed = function () {
                    me.get(), e++
                }, me.unneeded = function () {
                    --e || (t.unbind(), t = null)
                }
            }();
            var ye = dt.extend(se, {
                options: null,
                sourceEl: null,
                el: null,
                parentEl: null,
                top0: null,
                left0: null,
                y0: null,
                x0: null,
                topDelta: null,
                leftDelta: null,
                isFollowing: !1,
                isHidden: !1,
                isAnimating: !1,
                constructor: function (e, n) {
                    this.options = n = n || {}, this.sourceEl = e, this.parentEl = n.parentEl ? t(n.parentEl) : e.parent()
                },
                start: function (e) {
                    this.isFollowing || (this.isFollowing = !0, this.y0 = E(e), this.x0 = b(e), this.topDelta = 0, this.leftDelta = 0, this.isHidden || this.updatePosition(), S(e) ? this.listenTo(t(document), "touchmove", this.handleMove) : this.listenTo(t(document), "mousemove", this.handleMove))
                },
                stop: function (e, n) {
                    function i() {
                        r.isAnimating = !1, r.removeElement(), r.top0 = r.left0 = null, n && n()
                    }

                    var r = this, s = this.options.revertDuration;
                    this.isFollowing && !this.isAnimating && (this.isFollowing = !1, this.stopListeningTo(t(document)), e && s && !this.isHidden ? (this.isAnimating = !0, this.el.animate({
                        top: this.top0,
                        left: this.left0
                    }, {duration: s, complete: i})) : i())
                },
                getEl: function () {
                    var t = this.el;
                    return t || (t = this.el = this.sourceEl.clone().addClass(this.options.additionalClass || "").css({
                        position: "absolute",
                        visibility: "",
                        display: this.isHidden ? "none" : "",
                        margin: 0,
                        right: "auto",
                        bottom: "auto",
                        width: this.sourceEl.width(),
                        height: this.sourceEl.height(),
                        opacity: this.options.opacity || "",
                        zIndex: this.options.zIndex
                    }), t.addClass("fc-unselectable"), t.appendTo(this.parentEl)), t
                },
                removeElement: function () {
                    this.el && (this.el.remove(), this.el = null)
                },
                updatePosition: function () {
                    var t, e;
                    this.getEl(), null === this.top0 && (t = this.sourceEl.offset(), e = this.el.offsetParent().offset(), this.top0 = t.top - e.top, this.left0 = t.left - e.left), this.el.css({
                        top: this.top0 + this.topDelta,
                        left: this.left0 + this.leftDelta
                    })
                },
                handleMove: function (t) {
                    this.topDelta = E(t) - this.y0, this.leftDelta = b(t) - this.x0, this.isHidden || this.updatePosition()
                },
                hide: function () {
                    this.isHidden || (this.isHidden = !0, this.el && this.el.hide())
                },
                show: function () {
                    this.isHidden && (this.isHidden = !1, this.updatePosition(), this.getEl().show())
                }
            }), we = Wt.Scroller = dt.extend({
                el: null, scrollEl: null, overflowX: null, overflowY: null, constructor: function (t) {
                    t = t || {}, this.overflowX = t.overflowX || t.overflow || "auto", this.overflowY = t.overflowY || t.overflow || "auto"
                }, render: function () {
                    this.el = this.renderEl(), this.applyOverflow()
                }, renderEl: function () {
                    return this.scrollEl = t('<div class="fc-scroller"></div>')
                }, clear: function () {
                    this.setHeight("auto"), this.applyOverflow()
                }, destroy: function () {
                    this.el.remove()
                }, applyOverflow: function () {
                    this.scrollEl.css({"overflow-x": this.overflowX, "overflow-y": this.overflowY})
                }, lockOverflow: function (t) {
                    var e = this.overflowX, n = this.overflowY;
                    t = t || this.getScrollbarWidths(), "auto" === e && (e = t.top || t.bottom || this.scrollEl[0].scrollWidth - 1 > this.scrollEl[0].clientWidth ? "scroll" : "hidden"), "auto" === n && (n = t.left || t.right || this.scrollEl[0].scrollHeight - 1 > this.scrollEl[0].clientHeight ? "scroll" : "hidden"), this.scrollEl.css({
                        "overflow-x": e,
                        "overflow-y": n
                    })
                }, setHeight: function (t) {
                    this.scrollEl.height(t)
                }, getScrollTop: function () {
                    return this.scrollEl.scrollTop()
                }, setScrollTop: function (t) {
                    this.scrollEl.scrollTop(t)
                }, getClientWidth: function () {
                    return this.scrollEl[0].clientWidth
                }, getClientHeight: function () {
                    return this.scrollEl[0].clientHeight
                }, getScrollbarWidths: function () {
                    return p(this.scrollEl)
                }
            });
            yt.prototype.proxyCall = function (t) {
                var e = Array.prototype.slice.call(arguments, 1), n = [];
                return this.items.forEach(function (i) {
                    n.push(i[t].apply(i, e))
                }), n
            };
            var De = dt.extend({
                view: null, component: null, constructor: function (t) {
                    this.view = t._getView(), this.component = t
                }, opt: function (t) {
                    return this.view.opt(t)
                }, end: function () {
                }
            }), be = De.extend({
                dragListener: null, constructor: function (t) {
                    De.call(this, t), this.dragListener = this.buildDragListener()
                }, end: function () {
                    this.dragListener.endInteraction()
                }, bindToEl: function (t) {
                    var e = this.component, n = this.dragListener;
                    e.bindDateHandlerToEl(t, "mousedown", function (t) {
                        e.shouldIgnoreMouse() || n.startInteraction(t)
                    }), e.bindDateHandlerToEl(t, "touchstart", function (t) {
                        e.shouldIgnoreTouch() || n.startInteraction(t)
                    })
                }, buildDragListener: function () {
                    var t, e = this, n = this.component, i = new ve(n, {
                        scroll: this.opt("dragScroll"), interactionStart: function () {
                            t = i.origHit
                        }, hitOver: function (e, n, i) {
                            n || (t = null)
                        }, hitOut: function () {
                            t = null
                        }, interactionEnd: function (i, r) {
                            var s;
                            !r && t && (s = n.getSafeHitFootprint(t)) && e.view.triggerDayClick(s, n.getHitEl(t), i)
                        }
                    });
                    return i.shouldCancelTouchScroll = !1, i.scrollAlwaysKills = !0, i
                }
            }), Ee = Wt.DateSelecting = De.extend({
                dragListener: null, constructor: function (t) {
                    De.call(this, t), this.dragListener = this.buildDragListener()
                }, end: function () {
                    this.dragListener.endInteraction()
                }, getDelay: function () {
                    var t = this.opt("selectLongPressDelay");
                    return null == t && (t = this.opt("longPressDelay")), t
                }, bindToEl: function (t) {
                    var e = this, n = this.component, i = this.dragListener;
                    n.bindDateHandlerToEl(t, "mousedown", function (t) {
                        e.opt("selectable") && !n.shouldIgnoreMouse() && i.startInteraction(t, {distance: e.opt("selectMinDistance")})
                    }), n.bindDateHandlerToEl(t, "touchstart", function (t) {
                        e.opt("selectable") && !n.shouldIgnoreTouch() && i.startInteraction(t, {delay: e.getDelay()})
                    }), C(t)
                }, buildDragListener: function () {
                    var t, e = this, n = this.component;
                    return new ve(n, {
                        scroll: this.opt("dragScroll"), interactionStart: function () {
                            t = null
                        }, dragStart: function (t) {
                            e.view.unselect(t)
                        }, hitOver: function (i, r, o) {
                            var a, l;
                            o && (a = n.getSafeHitFootprint(o), l = n.getSafeHitFootprint(i), t = a && l ? e.computeSelection(a, l) : null, t ? n.renderSelectionFootprint(t) : !1 === t && s())
                        }, hitOut: function () {
                            t = null, n.unrenderSelection()
                        }, hitDone: function () {
                            o()
                        }, interactionEnd: function (n, i) {
                            !i && t && e.view.reportSelection(t, n)
                        }
                    })
                }, computeSelection: function (t, e) {
                    var n = this.computeSelectionFootprint(t, e);
                    return !(n && !this.isSelectionFootprintAllowed(n)) && n
                }, computeSelectionFootprint: function (t, e) {
                    var n = [t.unzonedRange.startMs, t.unzonedRange.endMs, e.unzonedRange.startMs, e.unzonedRange.endMs];
                    return n.sort(ot), new We(new Ue(n[0], n[3]), t.isAllDay)
                }, isSelectionFootprintAllowed: function (t) {
                    return this.component.dateProfile.validUnzonedRange.containsRange(t.unzonedRange) && this.view.calendar.isSelectionFootprintAllowed(t)
                }
            }), Se = Wt.EventDragging = De.extend({
                eventPointing: null, dragListener: null, isDragging: !1, constructor: function (t, e) {
                    De.call(this, t), this.eventPointing = e
                }, end: function () {
                    this.dragListener && this.dragListener.endInteraction()
                }, getSelectionDelay: function () {
                    var t = this.opt("eventLongPressDelay");
                    return null == t && (t = this.opt("longPressDelay")), t
                }, bindToEl: function (t) {
                    var e = this.component;
                    e.bindSegHandlerToEl(t, "mousedown", this.handleMousedown.bind(this)), e.bindSegHandlerToEl(t, "touchstart", this.handleTouchStart.bind(this))
                }, handleMousedown: function (t, e) {
                    this.component.canStartDrag(t, e) && this.buildDragListener(t).startInteraction(e, {distance: 5})
                }, handleTouchStart: function (t, e) {
                    var n = this.component,
                        i = {delay: this.view.isEventDefSelected(t.footprint.eventDef) ? 0 : this.getSelectionDelay()};
                    n.canStartDrag(t, e) ? this.buildDragListener(t).startInteraction(e, i) : n.canStartSelection(t, e) && this.buildSelectListener(t).startInteraction(e, i)
                }, buildSelectListener: function (t) {
                    var e = this, n = this.view, i = t.footprint.eventDef, r = t.footprint.eventInstance;
                    if (this.dragListener) return this.dragListener;
                    var s = this.dragListener = new pe({
                        dragStart: function (t) {
                            s.isTouch && !n.isEventDefSelected(i) && r && n.selectEventInstance(r)
                        }, interactionEnd: function (t) {
                            e.dragListener = null
                        }
                    });
                    return s
                }, buildDragListener: function (t) {
                    var e, n, i, r = this, a = this.component, l = this.view, u = l.calendar, c = u.eventManager,
                        h = t.el, d = t.footprint.eventDef, f = t.footprint.eventInstance;
                    if (this.dragListener) return this.dragListener;
                    var g = this.dragListener = new ve(l, {
                        scroll: this.opt("dragScroll"),
                        subjectEl: h,
                        subjectCenter: !0,
                        interactionStart: function (i) {
                            t.component = a, e = !1, n = new ye(t.el, {
                                additionalClass: "fc-dragging",
                                parentEl: l.el,
                                opacity: g.isTouch ? null : r.opt("dragOpacity"),
                                revertDuration: r.opt("dragRevertDuration"),
                                zIndex: 2
                            }), n.hide(), n.start(i)
                        },
                        dragStart: function (n) {
                            g.isTouch && !l.isEventDefSelected(d) && f && l.selectEventInstance(f), e = !0, r.eventPointing.handleMouseout(t, n), r.segDragStart(t, n), l.hideEventsWithId(t.footprint.eventDef.id)
                        },
                        hitOver: function (e, o, h) {
                            var f, p, v, m = !0;
                            t.hit && (h = t.hit), f = h.component.getSafeHitFootprint(h), p = e.component.getSafeHitFootprint(e), f && p ? (i = r.computeEventDropMutation(f, p, d), i ? (v = c.buildMutatedEventInstanceGroup(d.id, i), m = a.isEventInstanceGroupAllowed(v)) : m = !1) : m = !1, m || (i = null, s()), i && l.renderDrag(a.eventRangesToEventFootprints(v.sliceRenderRanges(a.dateProfile.renderUnzonedRange, u)), t, g.isTouch) ? n.hide() : n.show(), o && (i = null)
                        },
                        hitOut: function () {
                            l.unrenderDrag(t), n.show(), i = null
                        },
                        hitDone: function () {
                            o()
                        },
                        interactionEnd: function (s) {
                            delete t.component, n.stop(!i, function () {
                                e && (l.unrenderDrag(t), r.segDragStop(t, s)), l.showEventsWithId(t.footprint.eventDef.id), i && l.reportEventDrop(f, i, h, s)
                            }), r.dragListener = null
                        }
                    });
                    return g
                }, segDragStart: function (t, e) {
                    this.isDragging = !0, this.component.publiclyTrigger("eventDragStart", {
                        context: t.el[0],
                        args: [t.footprint.getEventLegacy(), e, {}, this.view]
                    })
                }, segDragStop: function (t, e) {
                    this.isDragging = !1, this.component.publiclyTrigger("eventDragStop", {
                        context: t.el[0],
                        args: [t.footprint.getEventLegacy(), e, {}, this.view]
                    })
                }, computeEventDropMutation: function (t, e, n) {
                    var i = new rn;
                    return i.setDateMutation(this.computeEventDateMutation(t, e)), i
                }, computeEventDateMutation: function (t, e) {
                    var n, i, r = t.unzonedRange.getStart(), s = e.unzonedRange.getStart(), o = !1, a = !1, l = !1;
                    return t.isAllDay !== e.isAllDay && (o = !0, e.isAllDay ? (l = !0, r.stripTime()) : a = !0), n = this.component.diffDates(s, r), i = new sn, i.clearEnd = o, i.forceTimed = a, i.forceAllDay = l, i.setDateDelta(n), i
                }
            }), Ce = Wt.EventResizing = De.extend({
                eventPointing: null, dragListener: null, isResizing: !1, constructor: function (t, e) {
                    De.call(this, t), this.eventPointing = e
                }, end: function () {
                    this.dragListener && this.dragListener.endInteraction()
                }, bindToEl: function (t) {
                    var e = this.component;
                    e.bindSegHandlerToEl(t, "mousedown", this.handleMouseDown.bind(this)), e.bindSegHandlerToEl(t, "touchstart", this.handleTouchStart.bind(this))
                }, handleMouseDown: function (e, n) {
                    this.component.canStartResize(e, n) && this.buildDragListener(e, t(n.target).is(".fc-start-resizer")).startInteraction(n, {distance: 5})
                }, handleTouchStart: function (e, n) {
                    this.component.canStartResize(e, n) && this.buildDragListener(e, t(n.target).is(".fc-start-resizer")).startInteraction(n)
                }, buildDragListener: function (t, e) {
                    var n, i, r = this, a = this.component, l = this.view, u = l.calendar, c = u.eventManager, h = t.el,
                        d = t.footprint.eventDef, f = t.footprint.eventInstance;
                    return this.dragListener = new ve(a, {
                        scroll: this.opt("dragScroll"),
                        subjectEl: h,
                        interactionStart: function () {
                            n = !1
                        },
                        dragStart: function (e) {
                            n = !0, r.eventPointing.handleMouseout(t, e), r.segResizeStart(t, e)
                        },
                        hitOver: function (n, o, h) {
                            var f, g = !0, p = a.getSafeHitFootprint(h), v = a.getSafeHitFootprint(n);
                            p && v ? (i = e ? r.computeEventStartResizeMutation(p, v, t.footprint) : r.computeEventEndResizeMutation(p, v, t.footprint), i ? (f = c.buildMutatedEventInstanceGroup(d.id, i), g = a.isEventInstanceGroupAllowed(f)) : g = !1) : g = !1, g ? i.isEmpty() && (i = null) : (i = null, s()), i && (l.hideEventsWithId(t.footprint.eventDef.id), l.renderEventResize(a.eventRangesToEventFootprints(f.sliceRenderRanges(a.dateProfile.renderUnzonedRange, u)), t))
                        },
                        hitOut: function () {
                            i = null
                        },
                        hitDone: function () {
                            l.unrenderEventResize(t), l.showEventsWithId(t.footprint.eventDef.id), o()
                        },
                        interactionEnd: function (e) {
                            n && r.segResizeStop(t, e), i && l.reportEventResize(f, i, h, e), r.dragListener = null
                        }
                    })
                }, segResizeStart: function (t, e) {
                    this.isResizing = !0, this.component.publiclyTrigger("eventResizeStart", {
                        context: t.el[0],
                        args: [t.footprint.getEventLegacy(), e, {}, this.view]
                    })
                }, segResizeStop: function (t, e) {
                    this.isResizing = !1, this.component.publiclyTrigger("eventResizeStop", {
                        context: t.el[0],
                        args: [t.footprint.getEventLegacy(), e, {}, this.view]
                    })
                }, computeEventStartResizeMutation: function (t, e, n) {
                    var i, r, s = n.componentFootprint.unzonedRange,
                        o = this.component.diffDates(e.unzonedRange.getStart(), t.unzonedRange.getStart());
                    return s.getStart().add(o) < s.getEnd() && (i = new sn, i.setStartDelta(o), r = new rn, r.setDateMutation(i), r)
                }, computeEventEndResizeMutation: function (t, e, n) {
                    var i, r, s = n.componentFootprint.unzonedRange,
                        o = this.component.diffDates(e.unzonedRange.getEnd(), t.unzonedRange.getEnd());
                    return s.getEnd().add(o) > s.getStart() && (i = new sn, i.setEndDelta(o), r = new rn, r.setDateMutation(i), r)
                }
            }), Re = Wt.ExternalDropping = De.extend(se, {
                dragListener: null, isDragging: !1, end: function () {
                    this.dragListener && this.dragListener.endInteraction()
                }, bindToDocument: function () {
                    this.listenTo(t(document), {dragstart: this.handleDragStart, sortstart: this.handleDragStart})
                }, unbindFromDocument: function () {
                    this.stopListeningTo(t(document))
                }, handleDragStart: function (e, n) {
                    var i, r;
                    this.opt("droppable") && (i = t((n ? n.item : null) || e.target), r = this.opt("dropAccept"), (t.isFunction(r) ? r.call(i[0], i) : i.is(r)) && (this.isDragging || this.listenToExternalDrag(i, e, n)))
                }, listenToExternalDrag: function (t, e, n) {
                    var i, r = this, a = this.component, l = this.view, u = wt(t);
                    (r.dragListener = new ve(a, {
                        interactionStart: function () {
                            r.isDragging = !0
                        }, hitOver: function (t) {
                            var e, n = !0, o = t.component.getSafeHitFootprint(t);
                            o ? (i = r.computeExternalDrop(o, u), i ? (e = new Je(i.buildInstances()), n = u.eventProps ? a.isEventInstanceGroupAllowed(e) : a.isExternalInstanceGroupAllowed(e)) : n = !1) : n = !1, n || (i = null, s()), i && a.renderDrag(a.eventRangesToEventFootprints(e.sliceRenderRanges(a.dateProfile.renderUnzonedRange, l.calendar)))
                        }, hitOut: function () {
                            i = null
                        }, hitDone: function () {
                            o(), a.unrenderDrag()
                        }, interactionEnd: function (e) {
                            i && l.reportExternalDrop(i, Boolean(u.eventProps), Boolean(u.stick), t, e, n), r.isDragging = !1, r.dragListener = null
                        }
                    })).startDrag(e)
                }, computeExternalDrop: function (e, n) {
                    var i, r = this.view.calendar, s = Wt.moment.utc(e.unzonedRange.startMs).stripZone();
                    return e.isAllDay && (n.startTime ? s.time(n.startTime) : s.stripTime()), n.duration && (i = s.clone().add(n.duration)), s = r.applyTimezone(s), i && (i = r.applyTimezone(i)), $e.parse(t.extend({}, n.eventProps, {
                        start: s,
                        end: i
                    }), new on(r))
                }
            });
            Wt.dataAttrPrefix = "";
            var Te = Wt.EventPointing = De.extend({
                mousedOverSeg: null, bindToEl: function (t) {
                    var e = this.component;
                    e.bindSegHandlerToEl(t, "click", this.handleClick.bind(this)), e.bindSegHandlerToEl(t, "mouseenter", this.handleMouseover.bind(this)), e.bindSegHandlerToEl(t, "mouseleave", this.handleMouseout.bind(this))
                }, handleClick: function (t, e) {
                    !1 === this.component.publiclyTrigger("eventClick", {
                        context: t.el[0],
                        args: [t.footprint.getEventLegacy(), e, this.view]
                    }) && e.preventDefault()
                }, handleMouseover: function (t, e) {
                    me.get().shouldIgnoreMouse() || this.mousedOverSeg || (this.mousedOverSeg = t, this.view.isEventDefResizable(t.footprint.eventDef) && t.el.addClass("fc-allow-mouse-resize"), this.component.publiclyTrigger("eventMouseover", {
                        context: t.el[0],
                        args: [t.footprint.getEventLegacy(), e, this.view]
                    }))
                }, handleMouseout: function (t, e) {
                    this.mousedOverSeg && (this.mousedOverSeg = null, this.view.isEventDefResizable(t.footprint.eventDef) && t.el.removeClass("fc-allow-mouse-resize"), this.component.publiclyTrigger("eventMouseout", {
                        context: t.el[0],
                        args: [t.footprint.getEventLegacy(), e || {}, this.view]
                    }))
                }, end: function () {
                    this.mousedOverSeg && this.handleMouseout(this.mousedOverSeg)
                }
            }), Ie = Wt.StandardInteractionsMixin = {
                dateClickingClass: be,
                dateSelectingClass: Ee,
                eventPointingClass: Te,
                eventDraggingClass: Se,
                eventResizingClass: Ce,
                externalDroppingClass: Re
            }, He = Wt.EventRenderer = dt.extend({
                view: null,
                component: null,
                fillRenderer: null,
                fgSegs: null,
                bgSegs: null,
                eventTimeFormat: null,
                displayEventTime: null,
                displayEventEnd: null,
                constructor: function (t, e) {
                    this.view = t._getView(), this.component = t, this.fillRenderer = e
                },
                opt: function (t) {
                    return this.view.opt(t)
                },
                rangeUpdated: function () {
                    var t, e;
                    this.eventTimeFormat = this.opt("eventTimeFormat") || this.opt("timeFormat") || this.computeEventTimeFormat(), t = this.opt("displayEventTime"), null == t && (t = this.computeDisplayEventTime()), e = this.opt("displayEventEnd"), null == e && (e = this.computeDisplayEventEnd()), this.displayEventTime = t, this.displayEventEnd = e
                },
                render: function (t) {
                    var e, n, i, r = this.component._getDateProfile(), s = [], o = [];
                    for (e in t) n = t[e], i = n.sliceRenderRanges(r.activeUnzonedRange), n.getEventDef().hasBgRendering() ? s.push.apply(s, i) : o.push.apply(o, i);
                    this.renderBgRanges(s), this.renderFgRanges(o)
                },
                unrender: function () {
                    this.unrenderBgRanges(), this.unrenderFgRanges()
                },
                renderFgRanges: function (t) {
                    var e = this.component.eventRangesToEventFootprints(t), n = this.component.eventFootprintsToSegs(e);
                    n = this.renderFgSegEls(n), !1 !== this.renderFgSegs(n) && (this.fgSegs = n)
                },
                unrenderFgRanges: function () {
                    this.unrenderFgSegs(this.fgSegs || []), this.fgSegs = null
                },
                renderBgRanges: function (t) {
                    var e = this.component.eventRangesToEventFootprints(t), n = this.component.eventFootprintsToSegs(e);
                    !1 !== this.renderBgSegs(n) && (this.bgSegs = n)
                },
                unrenderBgRanges: function () {
                    this.unrenderBgSegs(), this.bgSegs = null
                },
                getSegs: function () {
                    return (this.bgSegs || []).concat(this.fgSegs || [])
                },
                renderFgSegs: function (t) {
                    return !1
                },
                unrenderFgSegs: function (t) {
                },
                renderBgSegs: function (t) {
                    var e = this;
                    if (!this.fillRenderer) return !1;
                    this.fillRenderer.renderSegs("bgEvent", t, {
                        getClasses: function (t) {
                            return e.getBgClasses(t.footprint.eventDef)
                        }, getCss: function (t) {
                            return {"background-color": e.getBgColor(t.footprint.eventDef)}
                        }, filterEl: function (t, n) {
                            return e.filterEventRenderEl(t.footprint, n)
                        }
                    })
                },
                unrenderBgSegs: function () {
                    this.fillRenderer && this.fillRenderer.unrender("bgEvent")
                },
                renderFgSegEls: function (e, n) {
                    var i, r = this, s = this.view.hasPublicHandlers("eventRender"), o = "", a = [];
                    if (e.length) {
                        for (i = 0; i < e.length; i++) this.beforeFgSegHtml(e[i]), o += this.fgSegHtml(e[i], n);
                        t(o).each(function (n, i) {
                            var o = e[n], l = t(i);
                            s && (l = r.filterEventRenderEl(o.footprint, l)), l && (l.data("fc-seg", o), o.el = l, a.push(o))
                        })
                    }
                    return a
                },
                beforeFgSegHtml: function (t) {
                },
                fgSegHtml: function (t, e) {
                },
                getSegClasses: function (t, e, n) {
                    var i = ["fc-event", t.isStart ? "fc-start" : "fc-not-start", t.isEnd ? "fc-end" : "fc-not-end"].concat(this.getClasses(t.footprint.eventDef));
                    return e && i.push("fc-draggable"), n && i.push("fc-resizable"), this.view.isEventDefSelected(t.footprint.eventDef) && i.push("fc-selected"), i
                },
                filterEventRenderEl: function (e, n) {
                    var i = e.getEventLegacy(),
                        r = this.view.publiclyTrigger("eventRender", {context: i, args: [i, n, this.view]});
                    return !1 === r ? n = null : r && !0 !== r && (n = t(r)), n
                },
                getTimeText: function (t, e, n) {
                    return this._getTimeText(t.eventInstance.dateProfile.start, t.eventInstance.dateProfile.end, t.componentFootprint.isAllDay, e, n)
                },
                _getTimeText: function (t, e, n, i, r) {
                    return null == i && (i = this.eventTimeFormat), null == r && (r = this.displayEventEnd), this.displayEventTime && !n ? r && e ? this.view.formatRange({
                        start: t,
                        end: e
                    }, !1, i) : t.format(i) : ""
                },
                computeEventTimeFormat: function () {
                    return this.opt("smallTimeFormat")
                },
                computeDisplayEventTime: function () {
                    return !0
                },
                computeDisplayEventEnd: function () {
                    return !0
                },
                getBgClasses: function (t) {
                    var e = this.getClasses(t);
                    return e.push("fc-bgevent"), e
                },
                getClasses: function (t) {
                    var e, n = this.getStylingObjs(t), i = [];
                    for (e = 0; e < n.length; e++) i.push.apply(i, n[e].eventClassName || n[e].className || []);
                    return i
                },
                getSkinCss: function (t) {
                    return {
                        "background-color": this.getBgColor(t),
                        "border-color": this.getBorderColor(t),
                        color: this.getTextColor(t)
                    }
                },
                getBgColor: function (t) {
                    var e, n, i = this.getStylingObjs(t);
                    for (e = 0; e < i.length && !n; e++) n = i[e].eventBackgroundColor || i[e].eventColor || i[e].backgroundColor || i[e].color;
                    return n || (n = this.opt("eventBackgroundColor") || this.opt("eventColor")), n
                },
                getBorderColor: function (t) {
                    var e, n, i = this.getStylingObjs(t);
                    for (e = 0; e < i.length && !n; e++) n = i[e].eventBorderColor || i[e].eventColor || i[e].borderColor || i[e].color;
                    return n || (n = this.opt("eventBorderColor") || this.opt("eventColor")), n
                },
                getTextColor: function (t) {
                    var e, n, i = this.getStylingObjs(t);
                    for (e = 0; e < i.length && !n; e++) n = i[e].eventTextColor || i[e].textColor;
                    return n || (n = this.opt("eventTextColor")), n
                },
                getStylingObjs: function (t) {
                    var e = this.getFallbackStylingObjs(t);
                    return e.unshift(t), e
                },
                getFallbackStylingObjs: function (t) {
                    return [t.source]
                },
                sortEventSegs: function (t) {
                    t.sort(lt(this, "compareEventSegs"))
                },
                compareEventSegs: function (t, e) {
                    var n = t.footprint.componentFootprint, i = n.unzonedRange, r = e.footprint.componentFootprint,
                        s = r.unzonedRange;
                    return i.startMs - s.startMs || s.endMs - s.startMs - (i.endMs - i.startMs) || r.isAllDay - n.isAllDay || z(t.footprint.eventDef, e.footprint.eventDef, this.view.eventOrderSpecs)
                }
            }), Me = Wt.BusinessHourRenderer = dt.extend({
                component: null,
                fillRenderer: null,
                segs: null,
                constructor: function (t, e) {
                    this.component = t, this.fillRenderer = e
                },
                render: function (t) {
                    var e = this.component, n = e._getDateProfile().activeUnzonedRange,
                        i = t.buildEventInstanceGroup(e.hasAllDayBusinessHours, n),
                        r = i ? e.eventRangesToEventFootprints(i.sliceRenderRanges(n)) : [];
                    this.renderEventFootprints(r)
                },
                renderEventFootprints: function (t) {
                    var e = this.component.eventFootprintsToSegs(t);
                    this.renderSegs(e), this.segs = e
                },
                renderSegs: function (t) {
                    this.fillRenderer && this.fillRenderer.renderSegs("businessHours", t, {
                        getClasses: function (t) {
                            return ["fc-nonbusiness", "fc-bgevent"]
                        }
                    })
                },
                unrender: function () {
                    this.fillRenderer && this.fillRenderer.unrender("businessHours"), this.segs = null
                },
                getSegs: function () {
                    return this.segs || []
                }
            }), xe = Wt.FillRenderer = dt.extend({
                fillSegTag: "div",
                component: null,
                elsByFill: null,
                constructor: function (t) {
                    this.component = t, this.elsByFill = {}
                },
                renderFootprint: function (t, e, n) {
                    this.renderSegs(t, this.component.componentFootprintToSegs(e), n)
                },
                renderSegs: function (t, e, n) {
                    var i;
                    return e = this.buildSegEls(t, e, n), i = this.attachSegEls(t, e), i && this.reportEls(t, i), e
                },
                unrender: function (t) {
                    var e = this.elsByFill[t];
                    e && (e.remove(), delete this.elsByFill[t])
                },
                buildSegEls: function (e, n, i) {
                    var r, s = this, o = "", a = [];
                    if (n.length) {
                        for (r = 0; r < n.length; r++) o += this.buildSegHtml(e, n[r], i);
                        t(o).each(function (e, r) {
                            var o = n[e], l = t(r);
                            i.filterEl && (l = i.filterEl(o, l)), l && (l = t(l), l.is(s.fillSegTag) && (o.el = l, a.push(o)))
                        })
                    }
                    return a
                },
                buildSegHtml: function (t, e, n) {
                    var i = n.getClasses ? n.getClasses(e) : [], r = it(n.getCss ? n.getCss(e) : {});
                    return "<" + this.fillSegTag + (i.length ? ' class="' + i.join(" ") + '"' : "") + (r ? ' style="' + r + '"' : "") + " />"
                },
                attachSegEls: function (t, e) {
                },
                reportEls: function (e, n) {
                    this.elsByFill[e] ? this.elsByFill[e] = this.elsByFill[e].add(n) : this.elsByFill[e] = t(n)
                }
            }), Pe = Wt.HelperRenderer = dt.extend({
                view: null, component: null, eventRenderer: null, helperEls: null, constructor: function (t, e) {
                    this.view = t._getView(), this.component = t, this.eventRenderer = e
                }, renderComponentFootprint: function (t) {
                    this.renderEventFootprints([this.fabricateEventFootprint(t)])
                }, renderEventDraggingFootprints: function (t, e, n) {
                    this.renderEventFootprints(t, e, "fc-dragging", n ? null : this.view.opt("dragOpacity"))
                }, renderEventResizingFootprints: function (t, e, n) {
                    this.renderEventFootprints(t, e, "fc-resizing")
                }, renderEventFootprints: function (t, e, n, i) {
                    var r, s = this.component.eventFootprintsToSegs(t), o = "fc-helper " + (n || "");
                    for (s = this.eventRenderer.renderFgSegEls(s), r = 0; r < s.length; r++) s[r].el.addClass(o);
                    if (null != i) for (r = 0; r < s.length; r++) s[r].el.css("opacity", i);
                    this.helperEls = this.renderSegs(s, e)
                }, renderSegs: function (t, e) {
                }, unrender: function () {
                    this.helperEls && (this.helperEls.remove(), this.helperEls = null)
                }, fabricateEventFootprint: function (t) {
                    var e, n = this.view.calendar, i = n.footprintToDateProfile(t), r = new $e(new on(n));
                    return r.dateProfile = i, e = r.buildInstance(), new nn(t, r, e)
                }
            }), ze = ue.extend({
                el: null, setElement: function (t) {
                    this.el = t, this.bindGlobalHandlers(), this.renderSkeleton(), this.set("isInDom", !0)
                }, removeElement: function () {
                    this.unset("isInDom"), this.unrenderSkeleton(), this.unbindGlobalHandlers(), this.el.remove()
                }, bindGlobalHandlers: function () {
                }, unbindGlobalHandlers: function () {
                }, renderSkeleton: function () {
                }, unrenderSkeleton: function () {
                }
            }), Fe = Wt.DateComponent = ze.extend({
                uid: null,
                childrenByUid: null,
                isRTL: !1,
                nextDayThreshold: null,
                dateProfile: null,
                eventRendererClass: null,
                helperRendererClass: null,
                businessHourRendererClass: null,
                fillRendererClass: null,
                eventRenderer: null,
                helperRenderer: null,
                businessHourRenderer: null,
                fillRenderer: null,
                hitsNeededDepth: 0,
                hasAllDayBusinessHours: !1,
                isDatesRendered: !1,
                constructor: function () {
                    ze.call(this), this.uid = String(Fe.guid++), this.childrenByUid = {}, this.nextDayThreshold = e.duration(this.opt("nextDayThreshold")), this.isRTL = this.opt("isRTL"), this.fillRendererClass && (this.fillRenderer = new this.fillRendererClass(this)), this.eventRendererClass && (this.eventRenderer = new this.eventRendererClass(this, this.fillRenderer)), this.helperRendererClass && this.eventRenderer && (this.helperRenderer = new this.helperRendererClass(this, this.eventRenderer)), this.businessHourRendererClass && this.fillRenderer && (this.businessHourRenderer = new this.businessHourRendererClass(this, this.fillRenderer))
                },
                addChild: function (t) {
                    return !this.childrenByUid[t.uid] && (this.childrenByUid[t.uid] = t, !0)
                },
                removeChild: function (t) {
                    return !!this.childrenByUid[t.uid] && (delete this.childrenByUid[t.uid], !0)
                },
                updateSize: function (t, e, n) {
                    this.callChildren("updateSize", arguments)
                },
                opt: function (t) {
                    return this._getView().opt(t)
                },
                publiclyTrigger: function () {
                    var t = this._getCalendar();
                    return t.publiclyTrigger.apply(t, arguments)
                },
                hasPublicHandlers: function () {
                    var t = this._getCalendar();
                    return t.hasPublicHandlers.apply(t, arguments)
                },
                executeDateRender: function (t) {
                    this.dateProfile = t, this.renderDates(t), this.isDatesRendered = !0, this.callChildren("executeDateRender", arguments)
                },
                executeDateUnrender: function () {
                    this.callChildren("executeDateUnrender", arguments), this.dateProfile = null, this.unrenderDates(), this.isDatesRendered = !1
                },
                renderDates: function (t) {
                },
                unrenderDates: function () {
                },
                getNowIndicatorUnit: function () {
                },
                renderNowIndicator: function (t) {
                    this.callChildren("renderNowIndicator", arguments)
                },
                unrenderNowIndicator: function () {
                    this.callChildren("unrenderNowIndicator", arguments)
                },
                renderBusinessHours: function (t) {
                    this.businessHourRenderer && this.businessHourRenderer.render(t), this.callChildren("renderBusinessHours", arguments)
                },
                unrenderBusinessHours: function () {
                    this.callChildren("unrenderBusinessHours", arguments), this.businessHourRenderer && this.businessHourRenderer.unrender()
                },
                executeEventRender: function (t) {
                    this.eventRenderer ? (this.eventRenderer.rangeUpdated(), this.eventRenderer.render(t)) : this.renderEvents && this.renderEvents(Dt(t)), this.callChildren("executeEventRender", arguments)
                },
                executeEventUnrender: function () {
                    this.callChildren("executeEventUnrender", arguments), this.eventRenderer ? this.eventRenderer.unrender() : this.destroyEvents && this.destroyEvents()
                },
                getBusinessHourSegs: function () {
                    var t = this.getOwnBusinessHourSegs();
                    return this.iterChildren(function (e) {
                        t.push.apply(t, e.getBusinessHourSegs())
                    }), t
                },
                getOwnBusinessHourSegs: function () {
                    return this.businessHourRenderer ? this.businessHourRenderer.getSegs() : []
                },
                getEventSegs: function () {
                    var t = this.getOwnEventSegs();
                    return this.iterChildren(function (e) {
                        t.push.apply(t, e.getEventSegs())
                    }), t
                },
                getOwnEventSegs: function () {
                    return this.eventRenderer ? this.eventRenderer.getSegs() : []
                },
                triggerAfterEventsRendered: function () {
                    this.triggerAfterEventSegsRendered(this.getEventSegs()), this.publiclyTrigger("eventAfterAllRender", {
                        context: this,
                        args: [this]
                    })
                },
                triggerAfterEventSegsRendered: function (t) {
                    var e = this;
                    this.hasPublicHandlers("eventAfterRender") && t.forEach(function (t) {
                        var n;
                        t.el && (n = t.footprint.getEventLegacy(), e.publiclyTrigger("eventAfterRender", {
                            context: n,
                            args: [n, t.el, e]
                        }))
                    })
                },
                triggerBeforeEventsDestroyed: function () {
                    this.triggerBeforeEventSegsDestroyed(this.getEventSegs())
                },
                triggerBeforeEventSegsDestroyed: function (t) {
                    var e = this;
                    this.hasPublicHandlers("eventDestroy") && t.forEach(function (t) {
                        var n;
                        t.el && (n = t.footprint.getEventLegacy(), e.publiclyTrigger("eventDestroy", {
                            context: n,
                            args: [n, t.el, e]
                        }))
                    })
                },
                showEventsWithId: function (t) {
                    this.getEventSegs().forEach(function (e) {
                        e.footprint.eventDef.id === t && e.el && e.el.css("visibility", "")
                    }), this.callChildren("showEventsWithId", arguments)
                },
                hideEventsWithId: function (t) {
                    this.getEventSegs().forEach(function (e) {
                        e.footprint.eventDef.id === t && e.el && e.el.css("visibility", "hidden")
                    }), this.callChildren("hideEventsWithId", arguments)
                },
                renderDrag: function (t, e, n) {
                    var i = !1;
                    return this.iterChildren(function (r) {
                        r.renderDrag(t, e, n) && (i = !0)
                    }), i
                },
                unrenderDrag: function () {
                    this.callChildren("unrenderDrag", arguments)
                },
                renderEventResize: function (t, e, n) {
                    this.callChildren("renderEventResize", arguments)
                },
                unrenderEventResize: function () {
                    this.callChildren("unrenderEventResize", arguments)
                },
                renderSelectionFootprint: function (t) {
                    this.renderHighlight(t), this.callChildren("renderSelectionFootprint", arguments)
                },
                unrenderSelection: function () {
                    this.unrenderHighlight(), this.callChildren("unrenderSelection", arguments)
                },
                renderHighlight: function (t) {
                    this.fillRenderer && this.fillRenderer.renderFootprint("highlight", t, {
                        getClasses: function () {
                            return ["fc-highlight"]
                        }
                    }), this.callChildren("renderHighlight", arguments)
                },
                unrenderHighlight: function () {
                    this.fillRenderer && this.fillRenderer.unrender("highlight"), this.callChildren("unrenderHighlight", arguments)
                },
                hitsNeeded: function () {
                    this.hitsNeededDepth++ || this.prepareHits(), this.callChildren("hitsNeeded", arguments)
                },
                hitsNotNeeded: function () {
                    this.hitsNeededDepth && !--this.hitsNeededDepth && this.releaseHits(), this.callChildren("hitsNotNeeded", arguments)
                },
                prepareHits: function () {
                },
                releaseHits: function () {
                },
                queryHit: function (t, e) {
                    var n, i, r = this.childrenByUid;
                    for (n in r) if (i = r[n].queryHit(t, e)) break;
                    return i
                },
                getSafeHitFootprint: function (t) {
                    var e = this.getHitFootprint(t);
                    return this.dateProfile.activeUnzonedRange.containsRange(e.unzonedRange) ? e : null
                },
                getHitFootprint: function (t) {
                },
                getHitEl: function (t) {
                },
                eventRangesToEventFootprints: function (t) {
                    var e, n = [];
                    for (e = 0; e < t.length; e++) n.push.apply(n, this.eventRangeToEventFootprints(t[e]));
                    return n
                },
                eventRangeToEventFootprints: function (t) {
                    return [zt(t)]
                },
                eventFootprintsToSegs: function (t) {
                    var e, n = [];
                    for (e = 0; e < t.length; e++) n.push.apply(n, this.eventFootprintToSegs(t[e]));
                    return n
                },
                eventFootprintToSegs: function (t) {
                    var e, n, i, r = t.componentFootprint.unzonedRange;
                    for (e = this.componentFootprintToSegs(t.componentFootprint), n = 0; n < e.length; n++) i = e[n], r.isStart || (i.isStart = !1), r.isEnd || (i.isEnd = !1), i.footprint = t;
                    return e
                },
                componentFootprintToSegs: function (t) {
                    return []
                },
                callChildren: function (t, e) {
                    this.iterChildren(function (n) {
                        n[t].apply(n, e)
                    })
                },
                iterChildren: function (t) {
                    var e, n = this.childrenByUid;
                    for (e in n) t(n[e])
                },
                _getCalendar: function () {
                    return this.calendar || this.view.calendar
                },
                _getView: function () {
                    return this.view
                },
                _getDateProfile: function () {
                    return this._getView().get("dateProfile")
                }
            });
            Fe.guid = 0, Fe.mixin({
                buildGotoAnchorHtml: function (e, n, i) {
                    var r, s, o, a;
                    return t.isPlainObject(e) ? (r = e.date, s = e.type, o = e.forceOff) : r = e, r = Wt.moment(r), a = {
                        date: r.format("YYYY-MM-DD"),
                        type: s || "day"
                    }, "string" == typeof n && (i = n, n = null), n = n ? " " + rt(n) : "", i = i || "", !o && this.opt("navLinks") ? "<a" + n + ' data-goto="' + et(JSON.stringify(a)) + '">' + i + "</a>" : "<span" + n + ">" + i + "</span>"
                }, getAllDayHtml: function () {
                    return this.opt("allDayHtml") || et(this.opt("allDayText"))
                }, getDayClasses: function (t, e) {
                    var n, i = this._getView(), r = [];
                    return this.dateProfile.activeUnzonedRange.containsDate(t) ? (r.push("fc-" + jt[t.day()]), i.isDateInOtherMonth(t, this.dateProfile) && r.push("fc-other-month"), n = i.calendar.getNow(), t.isSame(n, "day") ? (r.push("fc-today"), !0 !== e && r.push(i.calendar.theme.getClass("today"))) : t < n ? r.push("fc-past") : r.push("fc-future")) : r.push("fc-disabled-day"), r
                }, formatRange: function (t, e, n, i) {
                    var r = t.end;
                    return e && (r = r.clone().subtract(1)), ne(t.start, r, n, i, this.isRTL)
                }, currentRangeAs: function (t) {
                    return this._getDateProfile().currentUnzonedRange.as(t)
                }, computeDayRange: function (t) {
                    var e = this._getCalendar(), n = e.msToUtcMoment(t.startMs, !0), i = e.msToUtcMoment(t.endMs),
                        r = +i.time(), s = i.clone().stripTime();
                    return r && r >= this.nextDayThreshold && s.add(1, "days"), s <= n && (s = n.clone().add(1, "days")), {
                        start: n,
                        end: s
                    }
                }, isMultiDayRange: function (t) {
                    var e = this.computeDayRange(t);
                    return e.end.diff(e.start, "days") > 1
                }
            });
            var ke = Wt.InteractiveDateComponent = Fe.extend({
                dateClickingClass: null,
                dateSelectingClass: null,
                eventPointingClass: null,
                eventDraggingClass: null,
                eventResizingClass: null,
                externalDroppingClass: null,
                dateClicking: null,
                dateSelecting: null,
                eventPointing: null,
                eventDragging: null,
                eventResizing: null,
                externalDropping: null,
                segSelector: ".fc-event-container > *",
                largeUnit: null,
                constructor: function () {
                    Fe.call(this), this.dateSelectingClass && (this.dateClicking = new this.dateClickingClass(this)), this.dateSelectingClass && (this.dateSelecting = new this.dateSelectingClass(this)), this.eventPointingClass && (this.eventPointing = new this.eventPointingClass(this)), this.eventDraggingClass && this.eventPointing && (this.eventDragging = new this.eventDraggingClass(this, this.eventPointing)), this.eventResizingClass && this.eventPointing && (this.eventResizing = new this.eventResizingClass(this, this.eventPointing)), this.externalDroppingClass && (this.externalDropping = new this.externalDroppingClass(this))
                },
                setElement: function (t) {
                    Fe.prototype.setElement.apply(this, arguments), this.dateClicking && this.dateClicking.bindToEl(t), this.dateSelecting && this.dateSelecting.bindToEl(t), this.bindAllSegHandlersToEl(t)
                },
                unrender: function () {
                    this.endInteractions(), Fe.prototype.unrender.apply(this, arguments)
                },
                executeEventUnrender: function () {
                    this.endInteractions(), Fe.prototype.executeEventUnrender.apply(this, arguments)
                },
                bindGlobalHandlers: function () {
                    Fe.prototype.bindGlobalHandlers.apply(this, arguments), this.externalDropping && this.externalDropping.bindToDocument()
                },
                unbindGlobalHandlers: function () {
                    Fe.prototype.unbindGlobalHandlers.apply(this, arguments), this.externalDropping && this.externalDropping.unbindFromDocument()
                },
                bindDateHandlerToEl: function (e, n, i) {
                    var r = this;
                    this.el.on(n, function (e) {
                        if (!t(e.target).is(r.segSelector + "," + r.segSelector + " *,.fc-more,a[data-goto]")) return i.call(r, e)
                    })
                },
                bindAllSegHandlersToEl: function (t) {
                    [this.eventPointing, this.eventDragging, this.eventResizing].forEach(function (e) {
                        e && e.bindToEl(t)
                    })
                },
                bindSegHandlerToEl: function (e, n, i) {
                    var r = this;
                    e.on(n, this.segSelector, function (e) {
                        var n = t(this).data("fc-seg");
                        if (n && !r.shouldIgnoreEventPointing()) return i.call(r, n, e)
                    })
                },
                shouldIgnoreMouse: function () {
                    return me.get().shouldIgnoreMouse()
                },
                shouldIgnoreTouch: function () {
                    var t = this._getView();
                    return t.isSelected || t.selectedEvent
                },
                shouldIgnoreEventPointing: function () {
                    return this.eventDragging && this.eventDragging.isDragging || this.eventResizing && this.eventResizing.isResizing
                },
                canStartSelection: function (t, e) {
                    return S(e) && !this.canStartResize(t, e) && (this.isEventDefDraggable(t.footprint.eventDef) || this.isEventDefResizable(t.footprint.eventDef))
                },
                canStartDrag: function (t, e) {
                    return !this.canStartResize(t, e) && this.isEventDefDraggable(t.footprint.eventDef)
                },
                canStartResize: function (e, n) {
                    var i = this._getView(), r = e.footprint.eventDef;
                    return (!S(n) || i.isEventDefSelected(r)) && this.isEventDefResizable(r) && t(n.target).is(".fc-resizer")
                },
                endInteractions: function () {
                    [this.dateClicking, this.dateSelecting, this.eventPointing, this.eventDragging, this.eventResizing].forEach(function (t) {
                        t && t.end()
                    })
                },
                isEventDefDraggable: function (t) {
                    return this.isEventDefStartEditable(t)
                },
                isEventDefStartEditable: function (t) {
                    var e = t.isStartExplicitlyEditable();
                    return null == e && null == (e = this.opt("eventStartEditable")) && (e = this.isEventDefGenerallyEditable(t)), e
                },
                isEventDefGenerallyEditable: function (t) {
                    var e = t.isExplicitlyEditable();
                    return null == e && (e = this.opt("editable")), e
                },
                isEventDefResizableFromStart: function (t) {
                    return this.opt("eventResizableFromStart") && this.isEventDefResizable(t)
                },
                isEventDefResizableFromEnd: function (t) {
                    return this.isEventDefResizable(t)
                },
                isEventDefResizable: function (t) {
                    var e = t.isDurationExplicitlyEditable();
                    return null == e && null == (e = this.opt("eventDurationEditable")) && (e = this.isEventDefGenerallyEditable(t)), e
                },
                diffDates: function (t, e) {
                    return this.largeUnit ? L(t, e, this.largeUnit) : B(t, e)
                },
                isEventInstanceGroupAllowed: function (t) {
                    var e, n = this._getView(), i = this.dateProfile,
                        r = this.eventRangesToEventFootprints(t.getAllEventRanges());
                    for (e = 0; e < r.length; e++) if (!i.validUnzonedRange.containsRange(r[e].componentFootprint.unzonedRange)) return !1;
                    return n.calendar.isEventInstanceGroupAllowed(t)
                },
                isExternalInstanceGroupAllowed: function (t) {
                    var e, n = this._getView(), i = this.dateProfile,
                        r = this.eventRangesToEventFootprints(t.getAllEventRanges());
                    for (e = 0; e < r.length; e++) if (!i.validUnzonedRange.containsRange(r[e].componentFootprint.unzonedRange)) return !1;
                    for (e = 0; e < r.length; e++) if (!n.calendar.isSelectionFootprintAllowed(r[e].componentFootprint)) return !1;
                    return !0
                }
            }), Be = Wt.DayTableMixin = {
                breakOnWeeks: !1,
                dayDates: null,
                dayIndices: null,
                daysPerRow: null,
                rowCnt: null,
                colCnt: null,
                colHeadFormat: null,
                updateDayTable: function () {
                    for (var t, e, n, i = this.view, r = i.calendar, s = r.msToUtcMoment(this.dateProfile.renderUnzonedRange.startMs, !0), o = r.msToUtcMoment(this.dateProfile.renderUnzonedRange.endMs, !0), a = -1, l = [], u = []; s.isBefore(o);) i.isHiddenDay(s) ? l.push(a + .5) : (a++, l.push(a), u.push(s.clone())), s.add(1, "days");
                    if (this.breakOnWeeks) {
                        for (e = u[0].day(), t = 1; t < u.length && u[t].day() != e; t++) ;
                        n = Math.ceil(u.length / t)
                    } else n = 1, t = u.length;
                    this.dayDates = u, this.dayIndices = l, this.daysPerRow = t, this.rowCnt = n, this.updateDayTableCols()
                },
                updateDayTableCols: function () {
                    this.colCnt = this.computeColCnt(), this.colHeadFormat = this.opt("columnFormat") || this.computeColHeadFormat()
                },
                computeColCnt: function () {
                    return this.daysPerRow
                },
                getCellDate: function (t, e) {
                    return this.dayDates[this.getCellDayIndex(t, e)].clone()
                },
                getCellRange: function (t, e) {
                    var n = this.getCellDate(t, e);
                    return {start: n, end: n.clone().add(1, "days")}
                },
                getCellDayIndex: function (t, e) {
                    return t * this.daysPerRow + this.getColDayIndex(e)
                },
                getColDayIndex: function (t) {
                    return this.isRTL ? this.colCnt - 1 - t : t
                },
                getDateDayIndex: function (t) {
                    var e = this.dayIndices, n = t.diff(this.dayDates[0], "days");
                    return n < 0 ? e[0] - 1 : n >= e.length ? e[e.length - 1] + 1 : e[n]
                },
                computeColHeadFormat: function () {
                    return this.rowCnt > 1 || this.colCnt > 10 ? "ddd" : this.colCnt > 1 ? this.opt("dayOfMonthFormat") : "dddd"
                },
                sliceRangeByRow: function (t) {
                    var e, n, i, r, s, o = this.daysPerRow, a = this.view.computeDayRange(t),
                        l = this.getDateDayIndex(a.start), u = this.getDateDayIndex(a.end.clone().subtract(1, "days")),
                        c = [];
                    for (e = 0; e < this.rowCnt; e++) n = e * o, i = n + o - 1, r = Math.max(l, n), s = Math.min(u, i), r = Math.ceil(r), s = Math.floor(s), r <= s && c.push({
                        row: e,
                        firstRowDayIndex: r - n,
                        lastRowDayIndex: s - n,
                        isStart: r === l,
                        isEnd: s === u
                    });
                    return c
                },
                sliceRangeByDay: function (t) {
                    var e, n, i, r, s, o, a = this.daysPerRow, l = this.view.computeDayRange(t),
                        u = this.getDateDayIndex(l.start), c = this.getDateDayIndex(l.end.clone().subtract(1, "days")),
                        h = [];
                    for (e = 0; e < this.rowCnt; e++) for (n = e * a, i = n + a - 1, r = n; r <= i; r++) s = Math.max(u, r), o = Math.min(c, r), s = Math.ceil(s), o = Math.floor(o), s <= o && h.push({
                        row: e,
                        firstRowDayIndex: s - n,
                        lastRowDayIndex: o - n,
                        isStart: s === u,
                        isEnd: o === c
                    });
                    return h
                },
                renderHeadHtml: function () {
                    var t = this.view.calendar.theme;
                    return '<div class="fc-row ' + t.getClass("headerRow") + '"><table class="' + t.getClass("tableGrid") + '"><thead>' + this.renderHeadTrHtml() + "</thead></table></div>"
                },
                renderHeadIntroHtml: function () {
                    return this.renderIntroHtml()
                },
                renderHeadTrHtml: function () {
                    return "<tr>" + (this.isRTL ? "" : this.renderHeadIntroHtml()) + this.renderHeadDateCellsHtml() + (this.isRTL ? this.renderHeadIntroHtml() : "") + "</tr>"
                },
                renderHeadDateCellsHtml: function () {
                    var t, e, n = [];
                    for (t = 0; t < this.colCnt; t++) e = this.getCellDate(0, t), n.push(this.renderHeadDateCellHtml(e));
                    return n.join("")
                },
                renderHeadDateCellHtml: function (t, e, n) {
                    var i = this.view, r = this.dateProfile.activeUnzonedRange.containsDate(t),
                        s = ["fc-day-header", i.calendar.theme.getClass("widgetHeader")],
                        o = et(t.format(this.colHeadFormat));
                    return 1 === this.rowCnt ? s = s.concat(this.getDayClasses(t, !0)) : s.push("fc-" + jt[t.day()]), '<th class="' + s.join(" ") + '"' + (1 === (r && this.rowCnt) ? ' data-date="' + t.format("YYYY-MM-DD") + '"' : "") + (e > 1 ? ' colspan="' + e + '"' : "") + (n ? " " + n : "") + ">" + (r ? i.buildGotoAnchorHtml({
                        date: t,
                        forceOff: this.rowCnt > 1 || 1 === this.colCnt
                    }, o) : o) + "</th>"
                },
                renderBgTrHtml: function (t) {
                    return "<tr>" + (this.isRTL ? "" : this.renderBgIntroHtml(t)) + this.renderBgCellsHtml(t) + (this.isRTL ? this.renderBgIntroHtml(t) : "") + "</tr>"
                },
                renderBgIntroHtml: function (t) {
                    return this.renderIntroHtml()
                },
                renderBgCellsHtml: function (t) {
                    var e, n, i = [];
                    for (e = 0; e < this.colCnt; e++) n = this.getCellDate(t, e), i.push(this.renderBgCellHtml(n));
                    return i.join("")
                },
                renderBgCellHtml: function (t, e) {
                    var n = this.view, i = this.dateProfile.activeUnzonedRange.containsDate(t),
                        r = this.getDayClasses(t);
                    return r.unshift("fc-day", n.calendar.theme.getClass("widgetContent")), '<td class="' + r.join(" ") + '"' + (i ? ' data-date="' + t.format("YYYY-MM-DD") + '"' : "") + (e ? " " + e : "") + "></td>"
                },
                renderIntroHtml: function () {
                },
                bookendCells: function (t) {
                    var e = this.renderIntroHtml();
                    e && (this.isRTL ? t.append(e) : t.prepend(e))
                }
            }, Ae = Wt.View = ke.extend({
                type: null,
                name: null,
                title: null,
                calendar: null,
                viewSpec: null,
                options: null,
                renderQueue: null,
                batchRenderDepth: 0,
                queuedScroll: null,
                isSelected: !1,
                selectedEventInstance: null,
                eventOrderSpecs: null,
                isHiddenDayHash: null,
                isNowIndicatorRendered: null,
                initialNowDate: null,
                initialNowQueriedMs: null,
                nowIndicatorTimeoutID: null,
                nowIndicatorIntervalID: null,
                constructor: function (t, e) {
                    this.calendar = t, this.viewSpec = e, this.type = e.type, this.options = e.options, this.name = this.type, ke.call(this), this.initRenderQueue(), this.initHiddenDays(), this.bindBaseRenderHandlers(), this.eventOrderSpecs = P(this.opt("eventOrder")), this.initialize && this.initialize()
                },
                _getView: function () {
                    return this
                },
                opt: function (t) {
                    return this.options[t]
                },
                initRenderQueue: function () {
                    this.renderQueue = new de({event: this.opt("eventRenderWait")}), this.renderQueue.on("start", this.onRenderQueueStart.bind(this)), this.renderQueue.on("stop", this.onRenderQueueStop.bind(this)), this.on("before:change", this.startBatchRender), this.on("change", this.stopBatchRender)
                },
                onRenderQueueStart: function () {
                    this.calendar.freezeContentHeight(), this.addScroll(this.queryScroll())
                },
                onRenderQueueStop: function () {
                    this.calendar.updateViewSize() && this.popScroll(), this.calendar.thawContentHeight()
                },
                startBatchRender: function () {
                    this.batchRenderDepth++ || this.renderQueue.pause()
                },
                stopBatchRender: function () {
                    --this.batchRenderDepth || this.renderQueue.resume()
                },
                requestRender: function (t, e, n) {
                    this.renderQueue.queue(t, e, n)
                },
                whenSizeUpdated: function (t) {
                    this.renderQueue.isRunning ? this.renderQueue.one("stop", t.bind(this)) : t.call(this)
                },
                computeTitle: function (t) {
                    var e;
                    return e = /^(year|month)$/.test(t.currentRangeUnit) ? t.currentUnzonedRange : t.activeUnzonedRange, this.formatRange({
                        start: this.calendar.msToMoment(e.startMs, t.isRangeAllDay),
                        end: this.calendar.msToMoment(e.endMs, t.isRangeAllDay)
                    }, t.isRangeAllDay, this.opt("titleFormat") || this.computeTitleFormat(t), this.opt("titleRangeSeparator"))
                },
                computeTitleFormat: function (t) {
                    var e = t.currentRangeUnit;
                    return "year" == e ? "YYYY" : "month" == e ? this.opt("monthYearFormat") : t.currentUnzonedRange.as("days") > 1 ? "ll" : "LL"
                },
                setDate: function (t) {
                    var e = this.get("dateProfile"), n = this.buildDateProfile(t, null, !0);
                    e && e.activeUnzonedRange.equals(n.activeUnzonedRange) || this.set("dateProfile", n)
                },
                unsetDate: function () {
                    this.unset("dateProfile")
                },
                fetchInitialEvents: function (t) {
                    var e = this.calendar, n = t.isRangeAllDay && !this.usesMinMaxTime;
                    return e.requestEvents(e.msToMoment(t.activeUnzonedRange.startMs, n), e.msToMoment(t.activeUnzonedRange.endMs, n))
                },
                bindEventChanges: function () {
                    this.listenTo(this.calendar, "eventsReset", this.resetEvents)
                },
                unbindEventChanges: function () {
                    this.stopListeningTo(this.calendar, "eventsReset")
                },
                setEvents: function (t) {
                    this.set("currentEvents", t), this.set("hasEvents", !0)
                },
                unsetEvents: function () {
                    this.unset("currentEvents"), this.unset("hasEvents")
                },
                resetEvents: function (t) {
                    this.startBatchRender(), this.unsetEvents(), this.setEvents(t), this.stopBatchRender()
                },
                requestDateRender: function (t) {
                    var e = this;
                    this.requestRender(function () {
                        e.executeDateRender(t)
                    }, "date", "init")
                },
                requestDateUnrender: function () {
                    var t = this;
                    this.requestRender(function () {
                        t.executeDateUnrender()
                    }, "date", "destroy")
                },
                executeDateRender: function (t) {
                    Fe.prototype.executeDateRender.apply(this, arguments), this.render && this.render(), this.trigger("datesRendered"), this.addScroll({isDateInit: !0}), this.startNowIndicator()
                },
                executeDateUnrender: function () {
                    this.unselect(), this.stopNowIndicator(), this.trigger("before:datesUnrendered"), this.destroy && this.destroy(), Fe.prototype.executeDateUnrender.apply(this, arguments)
                },
                bindBaseRenderHandlers: function () {
                    var t = this;
                    this.on("datesRendered", function () {
                        t.whenSizeUpdated(t.triggerViewRender)
                    }), this.on("before:datesUnrendered", function () {
                        t.triggerViewDestroy()
                    })
                },
                triggerViewRender: function () {
                    this.publiclyTrigger("viewRender", {context: this, args: [this, this.el]})
                },
                triggerViewDestroy: function () {
                    this.publiclyTrigger("viewDestroy", {context: this, args: [this, this.el]})
                },
                requestEventsRender: function (t) {
                    var e = this;
                    this.requestRender(function () {
                        e.executeEventRender(t), e.whenSizeUpdated(e.triggerAfterEventsRendered)
                    }, "event", "init")
                },
                requestEventsUnrender: function () {
                    var t = this;
                    this.requestRender(function () {
                        t.triggerBeforeEventsDestroyed(), t.executeEventUnrender()
                    }, "event", "destroy")
                },
                requestBusinessHoursRender: function (t) {
                    var e = this;
                    this.requestRender(function () {
                        e.renderBusinessHours(t)
                    }, "businessHours", "init")
                },
                requestBusinessHoursUnrender: function () {
                    var t = this;
                    this.requestRender(function () {
                        t.unrenderBusinessHours()
                    }, "businessHours", "destroy")
                },
                bindGlobalHandlers: function () {
                    ke.prototype.bindGlobalHandlers.apply(this, arguments), this.listenTo(me.get(), {
                        touchstart: this.processUnselect,
                        mousedown: this.handleDocumentMousedown
                    })
                },
                unbindGlobalHandlers: function () {
                    ke.prototype.unbindGlobalHandlers.apply(this, arguments), this.stopListeningTo(me.get())
                },
                startNowIndicator: function () {
                    var t, n, i, r = this;
                    this.opt("nowIndicator") && (t = this.getNowIndicatorUnit()) && (n = lt(this, "updateNowIndicator"), this.initialNowDate = this.calendar.getNow(), this.initialNowQueriedMs = +new Date, i = this.initialNowDate.clone().startOf(t).add(1, t) - this.initialNowDate, this.nowIndicatorTimeoutID = setTimeout(function () {
                        r.nowIndicatorTimeoutID = null, n(), i = +e.duration(1, t), i = Math.max(100, i), r.nowIndicatorIntervalID = setInterval(n, i)
                    }, i))
                },
                updateNowIndicator: function () {
                    this.isDatesRendered && this.initialNowDate && (this.unrenderNowIndicator(), this.renderNowIndicator(this.initialNowDate.clone().add(new Date - this.initialNowQueriedMs)), this.isNowIndicatorRendered = !0)
                },
                stopNowIndicator: function () {
                    this.isNowIndicatorRendered && (this.nowIndicatorTimeoutID && (clearTimeout(this.nowIndicatorTimeoutID), this.nowIndicatorTimeoutID = null), this.nowIndicatorIntervalID && (clearTimeout(this.nowIndicatorIntervalID), this.nowIndicatorIntervalID = null), this.unrenderNowIndicator(), this.isNowIndicatorRendered = !1)
                },
                updateSize: function (t, e, n) {
                    this.setHeight ? this.setHeight(t, e) : ke.prototype.updateSize.apply(this, arguments), this.updateNowIndicator()
                },
                addScroll: function (e) {
                    var n = this.queuedScroll || (this.queuedScroll = {});
                    t.extend(n, e)
                },
                popScroll: function () {
                    this.applyQueuedScroll(), this.queuedScroll = null
                },
                applyQueuedScroll: function () {
                    this.queuedScroll && this.applyScroll(this.queuedScroll)
                },
                queryScroll: function () {
                    var e = {};
                    return this.isDatesRendered && t.extend(e, this.queryDateScroll()), e
                },
                applyScroll: function (e) {
                    e.isDateInit && this.isDatesRendered && t.extend(e, this.computeInitialDateScroll()), this.isDatesRendered && this.applyDateScroll(e)
                },
                computeInitialDateScroll: function () {
                    return {}
                },
                queryDateScroll: function () {
                    return {}
                },
                applyDateScroll: function (t) {
                },
                reportEventDrop: function (t, n, i, r) {
                    var s = this.calendar.eventManager, o = s.mutateEventsWithId(t.def.id, n, this.calendar),
                        a = n.dateMutation;
                    a && (t.dateProfile = a.buildNewDateProfile(t.dateProfile, this.calendar)), this.triggerEventDrop(t, a && a.dateDelta || e.duration(), o, i, r)
                },
                triggerEventDrop: function (t, e, n, i, r) {
                    this.publiclyTrigger("eventDrop", {context: i[0], args: [t.toLegacy(), e, n, r, {}, this]})
                },
                reportExternalDrop: function (t, e, n, i, r, s) {
                    e && this.calendar.eventManager.addEventDef(t, n), this.triggerExternalDrop(t, e, i, r, s)
                },
                triggerExternalDrop: function (t, e, n, i, r) {
                    this.publiclyTrigger("drop", {
                        context: n[0],
                        args: [t.dateProfile.start.clone(), i, r, this]
                    }), e && this.publiclyTrigger("eventReceive", {
                        context: this,
                        args: [t.buildInstance().toLegacy(), this]
                    })
                },
                reportEventResize: function (t, e, n, i) {
                    var r = this.calendar.eventManager, s = r.mutateEventsWithId(t.def.id, e, this.calendar);
                    t.dateProfile = e.dateMutation.buildNewDateProfile(t.dateProfile, this.calendar), this.triggerEventResize(t, e.dateMutation.endDelta, s, n, i)
                },
                triggerEventResize: function (t, e, n, i, r) {
                    this.publiclyTrigger("eventResize", {context: i[0], args: [t.toLegacy(), e, n, r, {}, this]})
                },
                select: function (t, e) {
                    this.unselect(e), this.renderSelectionFootprint(t), this.reportSelection(t, e)
                },
                renderSelectionFootprint: function (t, e) {
                    this.renderSelection ? this.renderSelection(t.toLegacy(this.calendar)) : ke.prototype.renderSelectionFootprint.apply(this, arguments)
                },
                reportSelection: function (t, e) {
                    this.isSelected = !0, this.triggerSelect(t, e)
                },
                triggerSelect: function (t, e) {
                    var n = this.calendar.footprintToDateProfile(t);
                    this.publiclyTrigger("select", {context: this, args: [n.start, n.end, e, this]})
                },
                unselect: function (t) {
                    this.isSelected && (this.isSelected = !1, this.destroySelection && this.destroySelection(), this.unrenderSelection(), this.publiclyTrigger("unselect", {
                        context: this,
                        args: [t, this]
                    }))
                },
                selectEventInstance: function (t) {
                    this.selectedEventInstance && this.selectedEventInstance === t || (this.unselectEventInstance(), this.getEventSegs().forEach(function (e) {
                        e.footprint.eventInstance === t && e.el && e.el.addClass("fc-selected")
                    }), this.selectedEventInstance = t)
                },
                unselectEventInstance: function () {
                    this.selectedEventInstance && (this.getEventSegs().forEach(function (t) {
                        t.el && t.el.removeClass("fc-selected")
                    }), this.selectedEventInstance = null)
                },
                isEventDefSelected: function (t) {
                    return this.selectedEventInstance && this.selectedEventInstance.def.id === t.id
                },
                handleDocumentMousedown: function (t) {
                    D(t) && this.processUnselect(t)
                },
                processUnselect: function (t) {
                    this.processRangeUnselect(t), this.processEventUnselect(t)
                },
                processRangeUnselect: function (e) {
                    var n;
                    this.isSelected && this.opt("unselectAuto") && ((n = this.opt("unselectCancel")) && t(e.target).closest(n).length || this.unselect(e))
                },
                processEventUnselect: function (e) {
                    this.selectedEventInstance && (t(e.target).closest(".fc-selected").length || this.unselectEventInstance())
                },
                triggerBaseRendered: function () {
                    this.publiclyTrigger("viewRender", {context: this, args: [this, this.el]})
                },
                triggerBaseUnrendered: function () {
                    this.publiclyTrigger("viewDestroy", {context: this, args: [this, this.el]})
                },
                triggerDayClick: function (t, e, n) {
                    var i = this.calendar.footprintToDateProfile(t);
                    this.publiclyTrigger("dayClick", {context: e, args: [i.start, n, this]})
                }
            });
            Ae.watch("displayingDates", ["isInDom", "dateProfile"], function (t) {
                this.requestDateRender(t.dateProfile)
            }, function () {
                this.requestDateUnrender()
            }), Ae.watch("displayingBusinessHours", ["displayingDates", "businessHourGenerator"], function (t) {
                this.requestBusinessHoursRender(t.businessHourGenerator)
            }, function () {
                this.requestBusinessHoursUnrender()
            }), Ae.watch("initialEvents", ["dateProfile"], function (t) {
                return this.fetchInitialEvents(t.dateProfile)
            }), Ae.watch("bindingEvents", ["initialEvents"], function (t) {
                this.setEvents(t.initialEvents), this.bindEventChanges()
            }, function () {
                this.unbindEventChanges(), this.unsetEvents()
            }), Ae.watch("displayingEvents", ["displayingDates", "hasEvents"], function () {
                this.requestEventsRender(this.get("currentEvents"))
            }, function () {
                this.requestEventsUnrender()
            }), Ae.watch("title", ["dateProfile"], function (t) {
                return this.title = this.computeTitle(t.dateProfile)
            }), Ae.watch("legacyDateProps", ["dateProfile"], function (t) {
                var e = this.calendar, n = t.dateProfile;
                this.start = e.msToMoment(n.activeUnzonedRange.startMs, n.isRangeAllDay), this.end = e.msToMoment(n.activeUnzonedRange.endMs, n.isRangeAllDay), this.intervalStart = e.msToMoment(n.currentUnzonedRange.startMs, n.isRangeAllDay), this.intervalEnd = e.msToMoment(n.currentUnzonedRange.endMs, n.isRangeAllDay)
            }), Ae.mixin({
                usesMinMaxTime: !1,
                start: null,
                end: null,
                intervalStart: null,
                intervalEnd: null,
                buildPrevDateProfile: function (t) {
                    var e = this.get("dateProfile"),
                        n = t.clone().startOf(e.currentRangeUnit).subtract(e.dateIncrement);
                    return this.buildDateProfile(n, -1)
                },
                buildNextDateProfile: function (t) {
                    var e = this.get("dateProfile"), n = t.clone().startOf(e.currentRangeUnit).add(e.dateIncrement);
                    return this.buildDateProfile(n, 1)
                },
                buildDateProfile: function (t, n, i) {
                    var r, s, o, a, l, u, c = !t.hasTime(), h = null, d = null;
                    return r = this.buildValidRange(), r = this.trimHiddenDays(r), i && (t = this.calendar.msToUtcMoment(r.constrainDate(t), c)), s = this.buildCurrentRangeInfo(t, n), o = /^(year|month|week|day)$/.test(s.unit), a = this.buildRenderRange(this.trimHiddenDays(s.unzonedRange), s.unit, o), a = this.trimHiddenDays(a), l = a.clone(), this.opt("showNonCurrentDates") || (l = l.intersect(s.unzonedRange)), h = e.duration(this.opt("minTime")), d = e.duration(this.opt("maxTime")), l = this.adjustActiveRange(l, h, d), l = l.intersect(r), l && (t = this.calendar.msToUtcMoment(l.constrainDate(t), c)), u = s.unzonedRange.intersectsWith(r), {
                        validUnzonedRange: r,
                        currentUnzonedRange: s.unzonedRange,
                        currentRangeUnit: s.unit,
                        isRangeAllDay: o,
                        activeUnzonedRange: l,
                        renderUnzonedRange: a,
                        minTime: h,
                        maxTime: d,
                        isValid: u,
                        date: t,
                        dateIncrement: this.buildDateIncrement(s.duration)
                    }
                },
                buildValidRange: function () {
                    return this.getUnzonedRangeOption("validRange", this.calendar.getNow()) || new Ue
                },
                buildCurrentRangeInfo: function (t, e) {
                    var n, i = null, r = null, s = null;
                    return this.viewSpec.duration ? (i = this.viewSpec.duration, r = this.viewSpec.durationUnit, s = this.buildRangeFromDuration(t, e, i, r)) : (n = this.opt("dayCount")) ? (r = "day", s = this.buildRangeFromDayCount(t, e, n)) : (s = this.buildCustomVisibleRange(t)) ? r = O(s.getStart(), s.getEnd()) : (i = this.getFallbackDuration(), r = O(i), s = this.buildRangeFromDuration(t, e, i, r)), {
                        duration: i,
                        unit: r,
                        unzonedRange: s
                    }
                },
                getFallbackDuration: function () {
                    return e.duration({days: 1})
                },
                adjustActiveRange: function (t, e, n) {
                    var i = t.getStart(), r = t.getEnd();
                    return this.usesMinMaxTime && (e < 0 && i.time(0).add(e), n > 864e5 && r.time(n - 864e5)), new Ue(i, r)
                },
                buildRangeFromDuration: function (t, n, i, r) {
                    var s, o, a, l = this.opt("dateAlignment"), u = t.clone();
                    return i.as("days") <= 1 && this.isHiddenDay(u) && (u = this.skipHiddenDays(u, n), u.startOf("day")), l || (o = this.opt("dateIncrement"), o ? (a = e.duration(o), l = a < i ? N(a, o) : r) : l = r), u.startOf(l), s = u.clone().add(i), new Ue(u, s)
                },
                buildRangeFromDayCount: function (t, e, n) {
                    var i, r = this.opt("dateAlignment"), s = 0, o = t.clone();
                    r && o.startOf(r), o.startOf("day"), o = this.skipHiddenDays(o, e), i = o.clone();
                    do {
                        i.add(1, "day"), this.isHiddenDay(i) || s++
                    } while (s < n);
                    return new Ue(o, i)
                },
                buildCustomVisibleRange: function (t) {
                    var e = this.getUnzonedRangeOption("visibleRange", this.calendar.applyTimezone(t));
                    return !e || null !== e.startMs && null !== e.endMs ? e : null
                },
                buildRenderRange: function (t, e, n) {
                    return t.clone()
                },
                buildDateIncrement: function (t) {
                    var n, i = this.opt("dateIncrement");
                    return i ? e.duration(i) : (n = this.opt("dateAlignment")) ? e.duration(1, n) : t || e.duration({days: 1})
                },
                trimHiddenDays: function (t) {
                    var e = t.getStart(), n = t.getEnd();
                    return e && (e = this.skipHiddenDays(e)), n && (n = this.skipHiddenDays(n, -1, !0)), new Ue(e, n)
                },
                isDateInOtherMonth: function (t, e) {
                    return !1
                },
                getUnzonedRangeOption: function (t) {
                    var e = this.opt(t);
                    if ("function" == typeof e && (e = e.apply(null, Array.prototype.slice.call(arguments, 1))), e) return this.calendar.parseUnzonedRange(e)
                },
                initHiddenDays: function () {
                    var e, n = this.opt("hiddenDays") || [], i = [], r = 0;
                    for (!1 === this.opt("weekends") && n.push(0, 6), e = 0; e < 7; e++) (i[e] = -1 !== t.inArray(e, n)) || r++;
                    if (!r) throw"invalid hiddenDays";
                    this.isHiddenDayHash = i
                },
                isHiddenDay: function (t) {
                    return e.isMoment(t) && (t = t.day()), this.isHiddenDayHash[t]
                },
                skipHiddenDays: function (t, e, n) {
                    var i = t.clone();
                    for (e = e || 1; this.isHiddenDayHash[(i.day() + (n ? e : 0) + 7) % 7];) i.add(e, "days");
                    return i
                }
            });
            var Le = Wt.Calendar = dt.extend(re, se, {
                view: null,
                viewsByType: null,
                currentDate: null,
                theme: null,
                businessHourGenerator: null,
                loadingLevel: 0,
                constructor: function (t, e) {
                    me.needed(), this.el = t, this.viewsByType = {}, this.viewSpecCache = {}, this.initOptionsInternals(e), this.initMomentInternals(), this.initCurrentDate(), this.initEventManager(), this.constructed()
                },
                constructed: function () {
                },
                getView: function () {
                    return this.view
                },
                publiclyTrigger: function (e, n) {
                    var i, r, s = this.opt(e);
                    if (t.isPlainObject(n) ? (i = n.context, r = n.args) : t.isArray(n) && (r = n), null == i && (i = this.el[0]), r || (r = []), this.triggerWith(e, i, r), s) return s.apply(i, r)
                },
                hasPublicHandlers: function (t) {
                    return this.hasHandlers(t) || this.opt(t)
                },
                instantiateView: function (t) {
                    var e = this.getViewSpec(t);
                    return new e.class(this, e)
                },
                isValidViewType: function (t) {
                    return Boolean(this.getViewSpec(t))
                },
                changeView: function (t, e) {
                    e && (e.start && e.end ? this.recordOptionOverrides({visibleRange: e}) : this.currentDate = this.moment(e).stripZone()), this.renderView(t)
                },
                zoomTo: function (t, e) {
                    var n;
                    e = e || "day", n = this.getViewSpec(e) || this.getUnitViewSpec(e), this.currentDate = t.clone(), this.renderView(n ? n.type : null)
                },
                initCurrentDate: function () {
                    var t = this.opt("defaultDate");
                    this.currentDate = null != t ? this.moment(t).stripZone() : this.getNow()
                },
                prev: function () {
                    var t = this.view.buildPrevDateProfile(this.currentDate);
                    t.isValid && (this.currentDate = t.date, this.renderView())
                },
                next: function () {
                    var t = this.view.buildNextDateProfile(this.currentDate);
                    t.isValid && (this.currentDate = t.date, this.renderView())
                },
                prevYear: function () {
                    this.currentDate.add(-1, "years"), this.renderView()
                },
                nextYear: function () {
                    this.currentDate.add(1, "years"), this.renderView()
                },
                today: function () {
                    this.currentDate = this.getNow(), this.renderView()
                },
                gotoDate: function (t) {
                    this.currentDate = this.moment(t).stripZone(), this.renderView()
                },
                incrementDate: function (t) {
                    this.currentDate.add(e.duration(t)), this.renderView()
                },
                getDate: function () {
                    return this.applyTimezone(this.currentDate)
                },
                pushLoading: function () {
                    this.loadingLevel++ || this.publiclyTrigger("loading", [!0, this.view])
                },
                popLoading: function () {
                    --this.loadingLevel || this.publiclyTrigger("loading", [!1, this.view])
                },
                select: function (t, e) {
                    this.view.select(this.buildSelectFootprint.apply(this, arguments))
                },
                unselect: function () {
                    this.view && this.view.unselect()
                },
                buildSelectFootprint: function (t, e) {
                    var n, i = this.moment(t).stripZone();
                    return n = e ? this.moment(e).stripZone() : i.hasTime() ? i.clone().add(this.defaultTimedEventDuration) : i.clone().add(this.defaultAllDayEventDuration), new We(new Ue(i, n), !i.hasTime())
                },
                parseUnzonedRange: function (t) {
                    var e = null, n = null;
                    return t.start && (e = this.moment(t.start).stripZone()), t.end && (n = this.moment(t.end).stripZone()), e || n ? e && n && n.isBefore(e) ? null : new Ue(e, n) : null
                },
                rerenderEvents: function () {
                    this.view.flash("displayingEvents")
                },
                initEventManager: function () {
                    var t = this, e = new qe(this), n = this.opt("eventSources") || [], i = this.opt("events");
                    this.eventManager = e, i && n.unshift(i), e.on("release", function (e) {
                        t.trigger("eventsReset", e)
                    }), e.freeze(), n.forEach(function (n) {
                        var i = an.parse(n, t);
                        i && e.addSource(i)
                    }), e.thaw()
                },
                requestEvents: function (t, e) {
                    return this.eventManager.requestEvents(t, e, this.opt("timezone"), !this.opt("lazyFetching"))
                }
            });
            Le.mixin({
                dirDefaults: null,
                localeDefaults: null,
                overrides: null,
                dynamicOverrides: null,
                optionsModel: null,
                initOptionsInternals: function (e) {
                    this.overrides = t.extend({}, e), this.dynamicOverrides = {}, this.optionsModel = new ue, this.populateOptionsHash()
                },
                option: function (t, e) {
                    var n;
                    if ("string" == typeof t) {
                        if (void 0 === e) return this.optionsModel.get(t);
                        n = {}, n[t] = e, this.setOptions(n)
                    } else "object" == typeof t && this.setOptions(t)
                },
                opt: function (t) {
                    return this.optionsModel.get(t)
                },
                setOptions: function (t) {
                    var e, n = 0;
                    this.recordOptionOverrides(t);
                    for (e in t) n++;
                    if (1 === n) {
                        if ("height" === e || "contentHeight" === e || "aspectRatio" === e) return void this.updateViewSize(!0);
                        if ("defaultDate" === e) return;
                        if ("businessHours" === e) return;
                        if ("timezone" === e) return void this.view.flash("initialEvents")
                    }
                    this.renderHeader(), this.renderFooter(), this.viewsByType = {}, this.reinitView()
                },
                populateOptionsHash: function () {
                    var t, e, i, r, s;
                    t = tt(this.dynamicOverrides.locale, this.overrides.locale), e = Oe[t], e || (t = Le.defaults.locale, e = Oe[t] || {}), i = tt(this.dynamicOverrides.isRTL, this.overrides.isRTL, e.isRTL, Le.defaults.isRTL), r = i ? Le.rtlDefaults : {}, this.dirDefaults = r, this.localeDefaults = e, s = n([Le.defaults, r, e, this.overrides, this.dynamicOverrides]), Rt(s), this.optionsModel.reset(s)
                },
                recordOptionOverrides: function (t) {
                    var e;
                    for (e in t) this.dynamicOverrides[e] = t[e];
                    this.viewSpecCache = {}, this.populateOptionsHash()
                }
            }), Le.mixin({
                defaultAllDayEventDuration: null,
                defaultTimedEventDuration: null,
                localeData: null,
                initMomentInternals: function () {
                    var t = this;
                    this.defaultAllDayEventDuration = e.duration(this.opt("defaultAllDayEventDuration")), this.defaultTimedEventDuration = e.duration(this.opt("defaultTimedEventDuration")), this.optionsModel.watch("buildingMomentLocale", ["?locale", "?monthNames", "?monthNamesShort", "?dayNames", "?dayNamesShort", "?firstDay", "?weekNumberCalculation"], function (e) {
                        var n, i = e.weekNumberCalculation, r = e.firstDay;
                        "iso" === i && (i = "ISO");
                        var s = Object.create(Tt(e.locale));
                        e.monthNames && (s._months = e.monthNames), e.monthNamesShort && (s._monthsShort = e.monthNamesShort), e.dayNames && (s._weekdays = e.dayNames), e.dayNamesShort && (s._weekdaysShort = e.dayNamesShort), null == r && "ISO" === i && (r = 1), null != r && (n = Object.create(s._week), n.dow = r, s._week = n), "ISO" !== i && "local" !== i && "function" != typeof i || (s._fullCalendar_weekCalc = i), t.localeData = s, t.currentDate && t.localizeMoment(t.currentDate)
                    })
                },
                moment: function () {
                    var t;
                    return "local" === this.opt("timezone") ? (t = Wt.moment.apply(null, arguments), t.hasTime() && t.local()) : t = "UTC" === this.opt("timezone") ? Wt.moment.utc.apply(null, arguments) : Wt.moment.parseZone.apply(null, arguments), this.localizeMoment(t), t
                },
                msToMoment: function (t, e) {
                    var n = Wt.moment.utc(t);
                    return e ? n.stripTime() : n = this.applyTimezone(n), this.localizeMoment(n), n
                },
                msToUtcMoment: function (t, e) {
                    var n = Wt.moment.utc(t);
                    return e && n.stripTime(), this.localizeMoment(n), n
                },
                localizeMoment: function (t) {
                    t._locale = this.localeData
                },
                getIsAmbigTimezone: function () {
                    return "local" !== this.opt("timezone") && "UTC" !== this.opt("timezone")
                },
                applyTimezone: function (t) {
                    if (!t.hasTime()) return t.clone();
                    var e, n = this.moment(t.toArray()), i = t.time() - n.time();
                    return i && (e = n.clone().add(i), t.time() - e.time() == 0 && (n = e)), n
                },
                footprintToDateProfile: function (t, e) {
                    var n, i = Wt.moment.utc(t.unzonedRange.startMs);
                    return e || (n = Wt.moment.utc(t.unzonedRange.endMs)), t.isAllDay ? (i.stripTime(), n && n.stripTime()) : (i = this.applyTimezone(i), n && (n = this.applyTimezone(n))), new tn(i, n, this)
                },
                getNow: function () {
                    var t = this.opt("now");
                    return "function" == typeof t && (t = t()), this.moment(t).stripZone()
                },
                humanizeDuration: function (t) {
                    return t.locale(this.opt("locale")).humanize()
                },
                getEventEnd: function (t) {
                    return t.end ? t.end.clone() : this.getDefaultEventEnd(t.allDay, t.start)
                },
                getDefaultEventEnd: function (t, e) {
                    var n = e.clone();
                    return t ? n.stripTime().add(this.defaultAllDayEventDuration) : n.add(this.defaultTimedEventDuration), this.getIsAmbigTimezone() && n.stripZone(), n
                }
            }), Le.mixin({
                viewSpecCache: null, getViewSpec: function (t) {
                    var e = this.viewSpecCache;
                    return e[t] || (e[t] = this.buildViewSpec(t))
                }, getUnitViewSpec: function (e) {
                    var n, i, r;
                    if (-1 != t.inArray(e, Zt)) for (n = this.header.getViewsWithButtons(), t.each(Wt.views, function (t) {
                        n.push(t)
                    }), i = 0; i < n.length; i++) if ((r = this.getViewSpec(n[i])) && r.singleUnit == e) return r
                }, buildViewSpec: function (t) {
                    for (var i, r, s, o, a, l = this.overrides.views || {}, u = [], c = [], h = [], d = t; d;) i = _t[d], r = l[d], d = null, "function" == typeof i && (i = {class: i}), i && (u.unshift(i), c.unshift(i.defaults || {}), s = s || i.duration, d = d || i.type), r && (h.unshift(r), s = s || r.duration, d = d || r.type);
                    return i = j(u), i.type = t, !!i.class && (s = s || this.dynamicOverrides.duration || this.overrides.duration, s && (o = e.duration(s), o.valueOf() && (a = N(o, s), i.duration = o, i.durationUnit = a, 1 === o.as(a) && (i.singleUnit = a, h.unshift(l[a] || {})))), i.defaults = n(c), i.overrides = n(h), this.buildViewSpecOptions(i), this.buildViewSpecButtonText(i, t), i)
                }, buildViewSpecOptions: function (t) {
                    t.options = n([Le.defaults, t.defaults, this.dirDefaults, this.localeDefaults, this.overrides, t.overrides, this.dynamicOverrides]), Rt(t.options)
                }, buildViewSpecButtonText: function (t, e) {
                    function n(n) {
                        var i = n.buttonText || {};
                        return i[e] || (t.buttonTextKey ? i[t.buttonTextKey] : null) || (t.singleUnit ? i[t.singleUnit] : null)
                    }

                    t.buttonTextOverride = n(this.dynamicOverrides) || n(this.overrides) || t.overrides.buttonText, t.buttonTextDefault = n(this.localeDefaults) || n(this.dirDefaults) || t.defaults.buttonText || n(Le.defaults) || (t.duration ? this.humanizeDuration(t.duration) : null) || e
                }
            }), Le.mixin({
                el: null,
                contentEl: null,
                suggestedViewHeight: null,
                ignoreUpdateViewSize: 0,
                freezeContentHeightDepth: 0,
                windowResizeProxy: null,
                render: function () {
                    this.contentEl ? this.elementVisible() && (this.calcSize(), this.renderView()) : this.initialRender()
                },
                initialRender: function () {
                    var e = this, n = this.el;
                    n.addClass("fc"), n.on("click.fc", "a[data-goto]", function (n) {
                        var i = t(this), r = i.data("goto"), s = e.moment(r.date), o = r.type,
                            a = e.view.opt("navLink" + st(o) + "Click");
                        "function" == typeof a ? a(s, n) : ("string" == typeof a && (o = a), e.zoomTo(s, o))
                    }), this.optionsModel.watch("settingTheme", ["?theme", "?themeSystem"], function (t) {
                        var i = hn.getThemeClass(t.themeSystem || t.theme), r = new i(e.optionsModel),
                            s = r.getClass("widget");
                        e.theme = r, s && n.addClass(s)
                    }, function () {
                        var t = e.theme.getClass("widget");
                        e.theme = null, t && n.removeClass(t)
                    }), this.optionsModel.watch("settingBusinessHourGenerator", ["?businessHours"], function (t) {
                        e.businessHourGenerator = new je(t.businessHours, e), e.view && e.view.set("businessHourGenerator", e.businessHourGenerator)
                    }, function () {
                        e.businessHourGenerator = null
                    }), this.optionsModel.watch("applyingDirClasses", ["?isRTL", "?locale"], function (t) {
                        n.toggleClass("fc-ltr", !t.isRTL), n.toggleClass("fc-rtl", t.isRTL)
                    }), this.contentEl = t("<div class='fc-view-container'/>").prependTo(n), this.initToolbars(), this.renderHeader(), this.renderFooter(), this.renderView(this.opt("defaultView")), this.opt("handleWindowResize") && t(window).resize(this.windowResizeProxy = ut(this.windowResize.bind(this), this.opt("windowResizeDelay")))
                },
                destroy: function () {
                    this.view && this.clearView(), this.toolbarsManager.proxyCall("removeElement"), this.contentEl.remove(), this.el.removeClass("fc fc-ltr fc-rtl"), this.optionsModel.unwatch("settingTheme"), this.optionsModel.unwatch("settingBusinessHourGenerator"), this.el.off(".fc"), this.windowResizeProxy && (t(window).unbind("resize", this.windowResizeProxy), this.windowResizeProxy = null), me.unneeded()
                },
                elementVisible: function () {
                    return this.el.is(":visible")
                },
                bindViewHandlers: function (t) {
                    var e = this;
                    t.watch("titleForCalendar", ["title"], function (n) {
                        t === e.view && e.setToolbarsTitle(n.title)
                    }), t.watch("dateProfileForCalendar", ["dateProfile"], function (n) {
                        t === e.view && (e.currentDate = n.dateProfile.date, e.updateToolbarButtons(n.dateProfile))
                    })
                },
                unbindViewHandlers: function (t) {
                    this.stopListeningTo(t), t.unwatch("titleForCalendar"), t.unwatch("dateProfileForCalendar")
                },
                renderView: function (e) {
                    var n, i = this.view;
                    this.freezeContentHeight(), i && e && i.type !== e && this.clearView(), !this.view && e && (n = this.view = this.viewsByType[e] || (this.viewsByType[e] = this.instantiateView(e)), this.bindViewHandlers(n), n.setElement(t("<div class='fc-view fc-" + e + "-view' />").appendTo(this.contentEl)), this.toolbarsManager.proxyCall("activateButton", e)), this.view && (this.view.get("businessHourGenerator") !== this.businessHourGenerator && this.view.set("businessHourGenerator", this.businessHourGenerator), this.view.setDate(this.currentDate)), this.thawContentHeight()
                },
                clearView: function () {
                    var t = this.view;
                    this.toolbarsManager.proxyCall("deactivateButton", t.type), this.unbindViewHandlers(t), t.removeElement(), this.view = null
                },
                reinitView: function () {
                    var t = this.view, e = t.queryScroll();
                    this.freezeContentHeight(), this.clearView(), this.calcSize(), this.renderView(t.type), this.view.applyScroll(e), this.thawContentHeight()
                },
                getSuggestedViewHeight: function () {
                    return null === this.suggestedViewHeight && this.calcSize(), this.suggestedViewHeight
                },
                isHeightAuto: function () {
                    return "auto" === this.opt("contentHeight") || "auto" === this.opt("height")
                },
                updateViewSize: function (t) {
                    var e, n = this.view;
                    if (!this.ignoreUpdateViewSize && n) return t && (this.calcSize(), e = n.queryScroll()), this.ignoreUpdateViewSize++, n.updateSize(this.getSuggestedViewHeight(), this.isHeightAuto(), t), this.ignoreUpdateViewSize--, t && n.applyScroll(e), !0
                },
                calcSize: function () {
                    this.elementVisible() && this._calcSize()
                },
                _calcSize: function () {
                    var t = this.opt("contentHeight"), e = this.opt("height");
                    this.suggestedViewHeight = "number" == typeof t ? t : "function" == typeof t ? t() : "number" == typeof e ? e - this.queryToolbarsHeight() : "function" == typeof e ? e() - this.queryToolbarsHeight() : "parent" === e ? this.el.parent().height() - this.queryToolbarsHeight() : Math.round(this.contentEl.width() / Math.max(this.opt("aspectRatio"), .5))
                },
                windowResize: function (t) {
                    t.target === window && this.view && this.view.isDatesRendered && this.updateViewSize(!0) && this.publiclyTrigger("windowResize", [this.view])
                },
                freezeContentHeight: function () {
                    this.freezeContentHeightDepth++ || this.forceFreezeContentHeight()
                },
                forceFreezeContentHeight: function () {
                    this.contentEl.css({width: "100%", height: this.contentEl.height(), overflow: "hidden"})
                },
                thawContentHeight: function () {
                    this.freezeContentHeightDepth--, this.contentEl.css({
                        width: "",
                        height: "",
                        overflow: ""
                    }), this.freezeContentHeightDepth && this.forceFreezeContentHeight()
                }
            }), Le.mixin({
                header: null, footer: null, toolbarsManager: null, initToolbars: function () {
                    this.header = new bt(this, this.computeHeaderOptions()), this.footer = new bt(this, this.computeFooterOptions()), this.toolbarsManager = new yt([this.header, this.footer])
                }, computeHeaderOptions: function () {
                    return {extraClasses: "fc-header-toolbar", layout: this.opt("header")}
                }, computeFooterOptions: function () {
                    return {extraClasses: "fc-footer-toolbar", layout: this.opt("footer")}
                }, renderHeader: function () {
                    var t = this.header;
                    t.setToolbarOptions(this.computeHeaderOptions()), t.render(), t.el && this.el.prepend(t.el)
                }, renderFooter: function () {
                    var t = this.footer;
                    t.setToolbarOptions(this.computeFooterOptions()), t.render(), t.el && this.el.append(t.el)
                }, setToolbarsTitle: function (t) {
                    this.toolbarsManager.proxyCall("updateTitle", t)
                }, updateToolbarButtons: function (t) {
                    var e = this.getNow(), n = this.view, i = n.buildDateProfile(e),
                        r = n.buildPrevDateProfile(this.currentDate), s = n.buildNextDateProfile(this.currentDate);
                    this.toolbarsManager.proxyCall(i.isValid && !t.currentUnzonedRange.containsDate(e) ? "enableButton" : "disableButton", "today"), this.toolbarsManager.proxyCall(r.isValid ? "enableButton" : "disableButton", "prev"), this.toolbarsManager.proxyCall(s.isValid ? "enableButton" : "disableButton", "next")
                }, queryToolbarsHeight: function () {
                    return this.toolbarsManager.items.reduce(function (t, e) {
                        return t + (e.el ? e.el.outerHeight(!0) : 0)
                    }, 0)
                }
            }), Le.prototype.isEventInstanceGroupAllowed = function (t) {
                var e, n = t.getEventDef(), i = this.eventRangesToEventFootprints(t.getAllEventRanges()),
                    r = this.getPeerEventInstances(n), s = r.map(Pt), o = this.eventRangesToEventFootprints(s),
                    a = n.getConstraint(), l = n.getOverlap(), u = this.opt("eventAllow");
                for (e = 0; e < i.length; e++) if (!this.isFootprintAllowed(i[e].componentFootprint, o, a, l, i[e].eventInstance)) return !1;
                if (u) for (e = 0; e < i.length; e++) if (!1 === u(i[e].componentFootprint.toLegacy(this), i[e].getEventLegacy())) return !1;
                return !0
            }, Le.prototype.getPeerEventInstances = function (t) {
                return this.eventManager.getEventInstancesWithoutId(t.id)
            }, Le.prototype.isSelectionFootprintAllowed = function (t) {
                var e, n = this.eventManager.getEventInstances(), i = n.map(Pt),
                    r = this.eventRangesToEventFootprints(i);
                return !!this.isFootprintAllowed(t, r, this.opt("selectConstraint"), this.opt("selectOverlap")) && (!(e = this.opt("selectAllow")) || !1 !== e(t.toLegacy(this)))
            }, Le.prototype.isFootprintAllowed = function (t, e, n, i, r) {
                var s, o;
                if (null != n && (s = this.constraintValToFootprints(n, t.isAllDay), !this.isFootprintWithinConstraints(t, s))) return !1;
                if (o = this.collectOverlapEventFootprints(e, t), !1 === i) {
                    if (o.length) return !1
                } else if ("function" == typeof i && !Et(o, i, r)) return !1;
                return !(r && !St(o, r))
            }, Le.prototype.isFootprintWithinConstraints = function (t, e) {
                var n;
                for (n = 0; n < e.length; n++) if (this.footprintContainsFootprint(e[n], t)) return !0;
                return !1
            }, Le.prototype.constraintValToFootprints = function (t, e) {
                var n;
                return "businessHours" === t ? this.buildCurrentBusinessFootprints(e) : "object" == typeof t ? (n = this.parseEventDefToInstances(t), n ? this.eventInstancesToFootprints(n) : this.parseFootprints(t)) : null != t ? (n = this.eventManager.getEventInstancesWithId(t), this.eventInstancesToFootprints(n)) : void 0
            }, Le.prototype.buildCurrentBusinessFootprints = function (t) {
                var e = this.view, n = e.get("businessHourGenerator"), i = e.dateProfile.activeUnzonedRange,
                    r = n.buildEventInstanceGroup(t, i);
                return r ? this.eventInstancesToFootprints(r.eventInstances) : []
            }, Le.prototype.eventInstancesToFootprints = function (t) {
                var e = t.map(Pt);
                return this.eventRangesToEventFootprints(e).map(kt)
            }, Le.prototype.collectOverlapEventFootprints = function (t, e) {
                var n, i = [];
                for (n = 0; n < t.length; n++) this.footprintsIntersect(e, t[n].componentFootprint) && i.push(t[n]);
                return i
            }, Le.prototype.parseEventDefToInstances = function (t) {
                var e = this.eventManager, n = Ze.parse(t, new on(this));
                return !!n && n.buildInstances(e.currentPeriod.unzonedRange)
            }, Le.prototype.eventRangesToEventFootprints = function (t) {
                var e, n = [];
                for (e = 0; e < t.length; e++) n.push.apply(n, this.eventRangeToEventFootprints(t[e]));
                return n
            }, Le.prototype.eventRangeToEventFootprints = function (t) {
                return [zt(t)]
            }, Le.prototype.parseFootprints = function (t) {
                var e, n;
                return t.start && (e = this.moment(t.start), e.isValid() || (e = null)), t.end && (n = this.moment(t.end), n.isValid() || (n = null)), [new We(new Ue(e, n), e && !e.hasTime() || n && !n.hasTime())]
            }, Le.prototype.footprintContainsFootprint = function (t, e) {
                return t.unzonedRange.containsRange(e.unzonedRange)
            }, Le.prototype.footprintsIntersect = function (t, e) {
                return t.unzonedRange.intersectsWith(e.unzonedRange)
            }, Le.mixin({
                getEventSources: function () {
                    return this.eventManager.otherSources.slice()
                }, getEventSourceById: function (t) {
                    return this.eventManager.getSourceById(on.normalizeId(t))
                }, addEventSource: function (t) {
                    var e = an.parse(t, this);
                    e && this.eventManager.addSource(e)
                }, removeEventSources: function (t) {
                    var e, n, i = this.eventManager;
                    if (null == t) this.eventManager.removeAllSources(); else {
                        for (e = i.multiQuerySources(t), i.freeze(), n = 0; n < e.length; n++) i.removeSource(e[n]);
                        i.thaw()
                    }
                }, removeEventSource: function (t) {
                    var e, n = this.eventManager, i = n.querySources(t);
                    for (n.freeze(), e = 0; e < i.length; e++) n.removeSource(i[e]);
                    n.thaw()
                }, refetchEventSources: function (t) {
                    var e, n = this.eventManager, i = n.multiQuerySources(t);
                    for (n.freeze(), e = 0; e < i.length; e++) n.refetchSource(i[e]);
                    n.thaw()
                }, refetchEvents: function () {
                    this.eventManager.refetchAllSources()
                }, renderEvents: function (t, e) {
                    this.eventManager.freeze();
                    for (var n = 0; n < t.length; n++) this.renderEvent(t[n], e);
                    this.eventManager.thaw()
                }, renderEvent: function (t, e) {
                    var n = this.eventManager, i = Ze.parse(t, t.source || n.stickySource);
                    i && n.addEventDef(i, e)
                }, removeEvents: function (t) {
                    var e, n, i = this.eventManager, r = [], s = {};
                    if (null == t) i.removeAllEventDefs(!0); else {
                        for (i.getEventInstances().forEach(function (t) {
                            r.push(t.toLegacy())
                        }), r = Ct(r, t), n = 0; n < r.length; n++) e = this.eventManager.getEventDefByUid(r[n]._id), s[e.id] = !0;
                        i.freeze();
                        for (n in s) i.removeEventDefsById(n, !0);
                        i.thaw()
                    }
                }, clientEvents: function (t) {
                    var e = [];
                    return this.eventManager.getEventInstances().forEach(function (t) {
                        e.push(t.toLegacy())
                    }), Ct(e, t)
                }, updateEvents: function (t) {
                    this.eventManager.freeze();
                    for (var e = 0; e < t.length; e++) this.updateEvent(t[e]);
                    this.eventManager.thaw()
                }, updateEvent: function (t) {
                    var e, n, i = this.eventManager.getEventDefByUid(t._id);
                    i instanceof $e && (e = i.buildInstance(), n = rn.createFromRawProps(e, t, null), this.eventManager.mutateEventsWithId(i.id, n))
                }
            }), Le.defaults = {
                titleRangeSeparator: " – ",
                monthYearFormat: "MMMM YYYY",
                defaultTimedEventDuration: "02:00:00",
                defaultAllDayEventDuration: {days: 1},
                forceEventDuration: !1,
                nextDayThreshold: "09:00:00",
                columnHeader: !0,
                defaultView: "month",
                aspectRatio: 1.35,
                header: {left: "title", center: "", right: "today prev,next"},
                weekends: !0,
                weekNumbers: !1,
                weekNumberTitle: "W",
                weekNumberCalculation: "local",
                scrollTime: "06:00:00",
                minTime: "00:00:00",
                maxTime: "24:00:00",
                showNonCurrentDates: !0,
                lazyFetching: !0,
                startParam: "start",
                endParam: "end",
                timezoneParam: "timezone",
                timezone: !1,
                isRTL: !1,
                buttonText: {
                    prev: "prev",
                    next: "next",
                    prevYear: "prev year",
                    nextYear: "next year",
                    year: "year",
                    today: "today",
                    month: "month",
                    week: "week",
                    day: "day"
                },
                allDayText: "all-day",
                agendaEventMinHeight: 0,
                theme: !1,
                dragOpacity: .75,
                dragRevertDuration: 500,
                dragScroll: !0,
                unselectAuto: !0,
                dropAccept: "*",
                eventOrder: "title",
                eventLimit: !1,
                eventLimitText: "more",
                eventLimitClick: "popover",
                dayPopoverFormat: "LL",
                handleWindowResize: !0,
                windowResizeDelay: 100,
                longPressDelay: 1e3
            }, Le.englishDefaults = {dayPopoverFormat: "dddd, MMMM D"}, Le.rtlDefaults = {
                header: {
                    left: "next,prev today",
                    center: "",
                    right: "title"
                },
                buttonIcons: {
                    prev: "right-single-arrow",
                    next: "left-single-arrow",
                    prevYear: "right-double-arrow",
                    nextYear: "left-double-arrow"
                },
                themeButtonIcons: {
                    prev: "circle-triangle-e",
                    next: "circle-triangle-w",
                    nextYear: "seek-prev",
                    prevYear: "seek-next"
                }
            };
            var Oe = Wt.locales = {};
            Wt.datepickerLocale = function (e, n, i) {
                var r = Oe[e] || (Oe[e] = {});
                r.isRTL = i.isRTL, r.weekNumberTitle = i.weekHeader, t.each(Ne, function (t, e) {
                    r[t] = e(i)
                }), t.datepicker && (t.datepicker.regional[n] = t.datepicker.regional[e] = i, t.datepicker.regional.en = t.datepicker.regional[""], t.datepicker.setDefaults(i))
            }, Wt.locale = function (e, i) {
                var r, s;
                r = Oe[e] || (Oe[e] = {}), i && (r = Oe[e] = n([r, i])), s = Tt(e), t.each(Ve, function (t, e) {
                    null == r[t] && (r[t] = e(s, r))
                }), Le.defaults.locale = e
            };
            var Ne = {
                buttonText: function (t) {
                    return {prev: nt(t.prevText), next: nt(t.nextText), today: nt(t.currentText)}
                }, monthYearFormat: function (t) {
                    return t.showMonthAfterYear ? "YYYY[" + t.yearSuffix + "] MMMM" : "MMMM YYYY[" + t.yearSuffix + "]"
                }
            }, Ve = {
                dayOfMonthFormat: function (t, e) {
                    var n = t.longDateFormat("l");
                    return n = n.replace(/^Y+[^\w\s]*|[^\w\s]*Y+$/g, ""), e.isRTL ? n += " ddd" : n = "ddd " + n, n
                }, mediumTimeFormat: function (t) {
                    return t.longDateFormat("LT").replace(/\s*a$/i, "a")
                }, smallTimeFormat: function (t) {
                    return t.longDateFormat("LT").replace(":mm", "(:mm)").replace(/(\Wmm)$/, "($1)").replace(/\s*a$/i, "a")
                }, extraSmallTimeFormat: function (t) {
                    return t.longDateFormat("LT").replace(":mm", "(:mm)").replace(/(\Wmm)$/, "($1)").replace(/\s*a$/i, "t")
                }, hourFormat: function (t) {
                    return t.longDateFormat("LT").replace(":mm", "").replace(/(\Wmm)$/, "").replace(/\s*a$/i, "a")
                }, noMeridiemTimeFormat: function (t) {
                    return t.longDateFormat("LT").replace(/\s*a$/i, "")
                }
            }, Ge = {
                smallDayDateFormat: function (t) {
                    return t.isRTL ? "D dd" : "dd D"
                }, weekFormat: function (t) {
                    return t.isRTL ? "w[ " + t.weekNumberTitle + "]" : "[" + t.weekNumberTitle + " ]w"
                }, smallWeekFormat: function (t) {
                    return t.isRTL ? "w[" + t.weekNumberTitle + "]" : "[" + t.weekNumberTitle + "]w"
                }
            };
            Wt.locale("en", Le.englishDefaults);
            var Ue = Wt.UnzonedRange = dt.extend({
                startMs: null, endMs: null, isStart: !0, isEnd: !0, constructor: function (t, n) {
                    e.isMoment(t) && (t = t.clone().stripZone()), e.isMoment(n) && (n = n.clone().stripZone()), t && (this.startMs = t.valueOf()), n && (this.endMs = n.valueOf())
                }, intersect: function (t) {
                    var e = this.startMs, n = this.endMs, i = null;
                    return null !== t.startMs && (e = null === e ? t.startMs : Math.max(e, t.startMs)), null !== t.endMs && (n = null === n ? t.endMs : Math.min(n, t.endMs)), (null === e || null === n || e < n) && (i = new Ue(e, n), i.isStart = this.isStart && e === this.startMs, i.isEnd = this.isEnd && n === this.endMs), i
                }, intersectsWith: function (t) {
                    return (null === this.endMs || null === t.startMs || this.endMs > t.startMs) && (null === this.startMs || null === t.endMs || this.startMs < t.endMs)
                }, containsRange: function (t) {
                    return (null === this.startMs || null !== t.startMs && t.startMs >= this.startMs) && (null === this.endMs || null !== t.endMs && t.endMs <= this.endMs)
                }, containsDate: function (t) {
                    var e = t.valueOf();
                    return (null === this.startMs || e >= this.startMs) && (null === this.endMs || e < this.endMs)
                }, constrainDate: function (t) {
                    var e = t.valueOf();
                    return null !== this.startMs && e < this.startMs && (e = this.startMs), null !== this.endMs && e >= this.endMs && (e = this.endMs - 1), e
                }, equals: function (t) {
                    return this.startMs === t.startMs && this.endMs === t.endMs
                }, clone: function () {
                    var t = new Ue(this.startMs, this.endMs);
                    return t.isStart = this.isStart, t.isEnd = this.isEnd, t
                }, getStart: function () {
                    if (null !== this.startMs) return Wt.moment.utc(this.startMs).stripZone()
                }, getEnd: function () {
                    if (null !== this.endMs) return Wt.moment.utc(this.endMs).stripZone()
                }, as: function (t) {
                    return e.utc(this.endMs).diff(e.utc(this.startMs), t, !0)
                }
            }), We = Wt.ComponentFootprint = dt.extend({
                unzonedRange: null, isAllDay: !1, constructor: function (t, e) {
                    this.unzonedRange = t, this.isAllDay = e
                }, toLegacy: function (t) {
                    return {
                        start: t.msToMoment(this.unzonedRange.startMs, this.isAllDay),
                        end: t.msToMoment(this.unzonedRange.endMs, this.isAllDay)
                    }
                }
            }), _e = dt.extend(re, {
                start: null,
                end: null,
                timezone: null,
                unzonedRange: null,
                requestsByUid: null,
                pendingCnt: 0,
                freezeDepth: 0,
                stuntedReleaseCnt: 0,
                releaseCnt: 0,
                eventDefsByUid: null,
                eventDefsById: null,
                eventInstanceGroupsById: null,
                constructor: function (t, e, n) {
                    this.start = t, this.end = e, this.timezone = n, this.unzonedRange = new Ue(t.clone().stripZone(), e.clone().stripZone()), this.requestsByUid = {}, this.eventDefsByUid = {}, this.eventDefsById = {}, this.eventInstanceGroupsById = {}
                },
                isWithinRange: function (t, e) {
                    return !t.isBefore(this.start) && !e.isAfter(this.end)
                },
                requestSources: function (t) {
                    this.freeze();
                    for (var e = 0; e < t.length; e++) this.requestSource(t[e]);
                    this.thaw()
                },
                requestSource: function (t) {
                    var e = this, n = {source: t, status: "pending"};
                    this.requestsByUid[t.uid] = n, this.pendingCnt += 1, t.fetch(this.start, this.end, this.timezone).then(function (t) {
                        "cancelled" !== n.status && (n.status = "completed", n.eventDefs = t, e.addEventDefs(t), e.pendingCnt--, e.tryRelease())
                    }, function () {
                        "cancelled" !== n.status && (n.status = "failed", e.pendingCnt--, e.tryRelease())
                    })
                },
                purgeSource: function (t) {
                    var e = this.requestsByUid[t.uid];
                    e && (delete this.requestsByUid[t.uid], "pending" === e.status ? (e.status = "cancelled", this.pendingCnt--, this.tryRelease()) : "completed" === e.status && e.eventDefs.forEach(this.removeEventDef.bind(this)))
                },
                purgeAllSources: function () {
                    var t, e, n = this.requestsByUid, i = 0;
                    for (t in n) e = n[t], "pending" === e.status ? e.status = "cancelled" : "completed" === e.status && i++;
                    this.requestsByUid = {}, this.pendingCnt = 0, i && this.removeAllEventDefs()
                },
                getEventDefByUid: function (t) {
                    return this.eventDefsByUid[t]
                },
                getEventDefsById: function (t) {
                    var e = this.eventDefsById[t];
                    return e ? e.slice() : []
                },
                addEventDefs: function (t) {
                    for (var e = 0; e < t.length; e++) this.addEventDef(t[e])
                },
                addEventDef: function (t) {
                    var e, n = this.eventDefsById, i = t.id, r = n[i] || (n[i] = []),
                        s = t.buildInstances(this.unzonedRange);
                    for (r.push(t), this.eventDefsByUid[t.uid] = t, e = 0; e < s.length; e++) this.addEventInstance(s[e], i)
                },
                removeEventDefsById: function (t) {
                    var e = this;
                    this.getEventDefsById(t).forEach(function (t) {
                        e.removeEventDef(t)
                    })
                },
                removeAllEventDefs: function () {
                    var e = t.isEmptyObject(this.eventDefsByUid);
                    this.eventDefsByUid = {}, this.eventDefsById = {}, this.eventInstanceGroupsById = {}, e || this.tryRelease()
                },
                removeEventDef: function (t) {
                    var e = this.eventDefsById, n = e[t.id];
                    delete this.eventDefsByUid[t.uid], n && (K(n, t), n.length || delete e[t.id], this.removeEventInstancesForDef(t))
                },
                getEventInstances: function () {
                    var t, e = this.eventInstanceGroupsById, n = [];
                    for (t in e) n.push.apply(n, e[t].eventInstances);
                    return n
                },
                getEventInstancesWithId: function (t) {
                    var e = this.eventInstanceGroupsById[t];
                    return e ? e.eventInstances.slice() : []
                },
                getEventInstancesWithoutId: function (t) {
                    var e, n = this.eventInstanceGroupsById, i = [];
                    for (e in n) e !== t && i.push.apply(i, n[e].eventInstances);
                    return i
                },
                addEventInstance: function (t, e) {
                    var n = this.eventInstanceGroupsById;
                    (n[e] || (n[e] = new Je)).eventInstances.push(t), this.tryRelease()
                },
                removeEventInstancesForDef: function (t) {
                    var e, n = this.eventInstanceGroupsById, i = n[t.id];
                    i && (e = X(i.eventInstances, function (e) {
                        return e.def === t
                    }), i.eventInstances.length || delete n[t.id], e && this.tryRelease())
                },
                tryRelease: function () {
                    this.pendingCnt || (this.freezeDepth ? this.stuntedReleaseCnt++ : this.release())
                },
                release: function () {
                    this.releaseCnt++, this.trigger("release", this.eventInstanceGroupsById)
                },
                whenReleased: function () {
                    var t = this;
                    return this.releaseCnt ? ce.resolve(this.eventInstanceGroupsById) : ce.construct(function (e) {
                        t.one("release", e)
                    })
                },
                freeze: function () {
                    this.freezeDepth++ || (this.stuntedReleaseCnt = 0)
                },
                thaw: function () {
                    --this.freezeDepth || !this.stuntedReleaseCnt || this.pendingCnt || this.release()
                }
            }), qe = dt.extend(re, se, {
                currentPeriod: null, calendar: null, stickySource: null, otherSources: null, constructor: function (t) {
                    this.calendar = t, this.stickySource = new ln(t), this.otherSources = []
                }, requestEvents: function (t, e, n, i) {
                    return !i && this.currentPeriod && this.currentPeriod.isWithinRange(t, e) && n === this.currentPeriod.timezone || this.setPeriod(new _e(t, e, n)), this.currentPeriod.whenReleased()
                }, addSource: function (t) {
                    this.otherSources.push(t), this.currentPeriod && this.currentPeriod.requestSource(t)
                }, removeSource: function (t) {
                    K(this.otherSources, t), this.currentPeriod && this.currentPeriod.purgeSource(t)
                }, removeAllSources: function () {
                    this.otherSources = [], this.currentPeriod && this.currentPeriod.purgeAllSources()
                }, refetchSource: function (t) {
                    var e = this.currentPeriod;
                    e && (e.freeze(), e.purgeSource(t), e.requestSource(t), e.thaw())
                }, refetchAllSources: function () {
                    var t = this.currentPeriod;
                    t && (t.freeze(), t.purgeAllSources(), t.requestSources(this.getSources()), t.thaw())
                }, getSources: function () {
                    return [this.stickySource].concat(this.otherSources)
                }, multiQuerySources: function (e) {
                    e ? t.isArray(e) || (e = [e]) : e = [];
                    var n, i = [];
                    for (n = 0; n < e.length; n++) i.push.apply(i, this.querySources(e[n]));
                    return i
                }, querySources: function (e) {
                    var n, i, r = this.otherSources;
                    for (n = 0; n < r.length; n++) if ((i = r[n]) === e) return [i];
                    return (i = this.getSourceById(on.normalizeId(e))) ? [i] : (e = an.parse(e, this.calendar), e ? t.grep(r, function (t) {
                        return Mt(e, t)
                    }) : void 0)
                }, getSourceById: function (e) {
                    return t.grep(this.otherSources, function (t) {
                        return t.id && t.id === e
                    })[0]
                }, setPeriod: function (t) {
                    this.currentPeriod && (this.unbindPeriod(this.currentPeriod), this.currentPeriod = null), this.currentPeriod = t, this.bindPeriod(t), t.requestSources(this.getSources())
                }, bindPeriod: function (t) {
                    this.listenTo(t, "release", function (t) {
                        this.trigger("release", t)
                    })
                }, unbindPeriod: function (t) {
                    this.stopListeningTo(t)
                }, getEventDefByUid: function (t) {
                    if (this.currentPeriod) return this.currentPeriod.getEventDefByUid(t)
                }, addEventDef: function (t, e) {
                    e && this.stickySource.addEventDef(t), this.currentPeriod && this.currentPeriod.addEventDef(t)
                }, removeEventDefsById: function (t) {
                    this.getSources().forEach(function (e) {
                        e.removeEventDefsById(t)
                    }), this.currentPeriod && this.currentPeriod.removeEventDefsById(t)
                }, removeAllEventDefs: function () {
                    this.getSources().forEach(function (t) {
                        t.removeAllEventDefs()
                    }), this.currentPeriod && this.currentPeriod.removeAllEventDefs()
                }, mutateEventsWithId: function (t, e) {
                    var n, i = this.currentPeriod, r = [];
                    return i ? (i.freeze(), n = i.getEventDefsById(t), n.forEach(function (t) {
                        i.removeEventDef(t), r.push(e.mutateSingle(t)), i.addEventDef(t)
                    }), i.thaw(), function () {
                        i.freeze();
                        for (var t = 0; t < n.length; t++) i.removeEventDef(n[t]), r[t](), i.addEventDef(n[t]);
                        i.thaw()
                    }) : function () {
                    }
                }, buildMutatedEventInstanceGroup: function (t, e) {
                    var n, i, r = this.getEventDefsById(t), s = [];
                    for (n = 0; n < r.length; n++) (i = r[n].clone()) instanceof $e && (e.mutateSingle(i), s.push.apply(s, i.buildInstances()));
                    return new Je(s)
                }, freeze: function () {
                    this.currentPeriod && this.currentPeriod.freeze()
                }, thaw: function () {
                    this.currentPeriod && this.currentPeriod.thaw()
                }
            });
            ["getEventDefsById", "getEventInstances", "getEventInstancesWithId", "getEventInstancesWithoutId"].forEach(function (t) {
                qe.prototype[t] = function () {
                    var e = this.currentPeriod;
                    return e ? e[t].apply(e, arguments) : []
                }
            });
            var Ye = {start: "09:00", end: "17:00", dow: [1, 2, 3, 4, 5], rendering: "inverse-background"},
                je = Wt.BusinessHourGenerator = dt.extend({
                    rawComplexDef: null,
                    calendar: null,
                    constructor: function (t, e) {
                        this.rawComplexDef = t, this.calendar = e
                    },
                    buildEventInstanceGroup: function (t, e) {
                        var n, i = this.buildEventDefs(t);
                        if (i.length) return n = new Je(xt(i, e)), n.explicitEventDef = i[0], n
                    },
                    buildEventDefs: function (e) {
                        var n, i = this.rawComplexDef, r = [], s = !1, o = [];
                        for (!0 === i ? r = [{}] : t.isPlainObject(i) ? r = [i] : t.isArray(i) && (r = i, s = !0), n = 0; n < r.length; n++) s && !r[n].dow || o.push(this.buildEventDef(e, r[n]));
                        return o
                    },
                    buildEventDef: function (e, n) {
                        var i = t.extend({}, Ye, n);
                        return e && (i.start = null, i.end = null), Xe.parse(i, new on(this.calendar))
                    }
                }), Ze = {
                    parse: function (t, n) {
                        return Y(t.start) || e.isDuration(t.start) || Y(t.end) || e.isDuration(t.end) ? Xe.parse(t, n) : $e.parse(t, n)
                    }
                }, Qe = Wt.EventDef = dt.extend(oe, {
                    source: null,
                    id: null,
                    rawId: null,
                    uid: null,
                    title: null,
                    url: null,
                    rendering: null,
                    constraint: null,
                    overlap: null,
                    editable: null,
                    startEditable: null,
                    durationEditable: null,
                    color: null,
                    backgroundColor: null,
                    borderColor: null,
                    textColor: null,
                    className: null,
                    miscProps: null,
                    constructor: function (t) {
                        this.source = t, this.className = [], this.miscProps = {}
                    },
                    isAllDay: function () {
                    },
                    buildInstances: function (t) {
                    },
                    clone: function () {
                        var e = new this.constructor(this.source);
                        return e.id = this.id, e.rawId = this.rawId, e.uid = this.uid, Qe.copyVerbatimStandardProps(this, e), e.className = this.className.slice(), e.miscProps = t.extend({}, this.miscProps), e
                    },
                    hasInverseRendering: function () {
                        return "inverse-background" === this.getRendering()
                    },
                    hasBgRendering: function () {
                        var t = this.getRendering();
                        return "inverse-background" === t || "background" === t
                    },
                    getRendering: function () {
                        return null != this.rendering ? this.rendering : this.source.rendering
                    },
                    getConstraint: function () {
                        return null != this.constraint ? this.constraint : null != this.source.constraint ? this.source.constraint : this.source.calendar.opt("eventConstraint")
                    },
                    getOverlap: function () {
                        return null != this.overlap ? this.overlap : null != this.source.overlap ? this.source.overlap : this.source.calendar.opt("eventOverlap")
                    },
                    isStartExplicitlyEditable: function () {
                        return null !== this.startEditable ? this.startEditable : this.source.startEditable
                    },
                    isDurationExplicitlyEditable: function () {
                        return null !== this.durationEditable ? this.durationEditable : this.source.durationEditable
                    },
                    isExplicitlyEditable: function () {
                        return null !== this.editable ? this.editable : this.source.editable
                    },
                    toLegacy: function () {
                        var e = t.extend({}, this.miscProps);
                        return e._id = this.uid, e.source = this.source, e.className = this.className.slice(), e.allDay = this.isAllDay(), null != this.rawId && (e.id = this.rawId), Qe.copyVerbatimStandardProps(this, e), e
                    },
                    applyManualStandardProps: function (e) {
                        return null != e.id ? this.id = Qe.normalizeId(this.rawId = e.id) : this.id = Qe.generateId(), null != e._id ? this.uid = String(e._id) : this.uid = Qe.generateId(), t.isArray(e.className) && (this.className = e.className),
                        "string" == typeof e.className && (this.className = e.className.split(/\s+/)), !0
                    },
                    applyMiscProps: function (e) {
                        t.extend(this.miscProps, e)
                    }
                });
            Qe.defineStandardProps = ae, Qe.copyVerbatimStandardProps = le, Qe.uuid = 0, Qe.normalizeId = function (t) {
                return String(t)
            }, Qe.generateId = function () {
                return "_fc" + Qe.uuid++
            }, Qe.defineStandardProps({
                _id: !1,
                id: !1,
                className: !1,
                source: !1,
                title: !0,
                url: !0,
                rendering: !0,
                constraint: !0,
                overlap: !0,
                editable: !0,
                startEditable: !0,
                durationEditable: !0,
                color: !0,
                backgroundColor: !0,
                borderColor: !0,
                textColor: !0
            }), Qe.parse = function (t, e) {
                var n = new this(e), i = e.calendar.opt("eventDataTransform"), r = e.eventDataTransform;
                return i && (t = i(t)), r && (t = r(t)), !!n.applyProps(t) && n
            };
            var $e = Qe.extend({
                dateProfile: null, buildInstances: function () {
                    return [this.buildInstance()]
                }, buildInstance: function () {
                    return new Ke(this, this.dateProfile)
                }, isAllDay: function () {
                    return this.dateProfile.isAllDay()
                }, clone: function () {
                    var t = Qe.prototype.clone.call(this);
                    return t.dateProfile = this.dateProfile, t
                }, rezone: function () {
                    var t = this.source.calendar, e = this.dateProfile;
                    this.dateProfile = new tn(t.moment(e.start), e.end ? t.moment(e.end) : null, t)
                }, applyManualStandardProps: function (t) {
                    var e = Qe.prototype.applyManualStandardProps.apply(this, arguments), n = tn.parse(t, this.source);
                    return !!n && (this.dateProfile = n, null != t.date && (this.miscProps.date = t.date), e)
                }
            });
            $e.defineStandardProps({start: !1, date: !1, end: !1, allDay: !1});
            var Xe = Qe.extend({
                startTime: null, endTime: null, dowHash: null, isAllDay: function () {
                    return !this.startTime && !this.endTime
                }, buildInstances: function (t) {
                    for (var e, n, i, r = this.source.calendar, s = t.getStart(), o = t.getEnd(), a = []; s.isBefore(o);) this.dowHash && !this.dowHash[s.day()] || (e = r.applyTimezone(s), n = e.clone(), i = null, this.startTime ? n.time(this.startTime) : n.stripTime(), this.endTime && (i = e.clone().time(this.endTime)), a.push(new Ke(this, new tn(n, i, r)))), s.add(1, "days");
                    return a
                }, setDow: function (t) {
                    this.dowHash || (this.dowHash = {});
                    for (var e = 0; e < t.length; e++) this.dowHash[t[e]] = !0
                }, clone: function () {
                    var n = Qe.prototype.clone.call(this);
                    return n.startTime && (n.startTime = e.duration(this.startTime)), n.endTime && (n.endTime = e.duration(this.endTime)), this.dowHash && (n.dowHash = t.extend({}, this.dowHash)), n
                }, applyProps: function (t) {
                    var n = Qe.prototype.applyProps.apply(this, arguments);
                    return t.start && (this.startTime = e.duration(t.start)), t.end && (this.endTime = e.duration(t.end)), t.dow && this.setDow(t.dow), n
                }
            });
            Xe.defineStandardProps({start: !1, end: !1, dow: !1});
            var Ke = dt.extend({
                def: null, dateProfile: null, constructor: function (t, e) {
                    this.def = t, this.dateProfile = e
                }, toLegacy: function () {
                    var t = this.dateProfile, e = this.def.toLegacy();
                    return e.start = t.start.clone(), e.end = t.end ? t.end.clone() : null, e
                }
            }), Je = Wt.EventInstanceGroup = dt.extend({
                eventInstances: null,
                explicitEventDef: null,
                constructor: function (t) {
                    this.eventInstances = t || []
                },
                getAllEventRanges: function (t) {
                    return t ? this.sliceNormalRenderRanges(t) : this.eventInstances.map(Pt)
                },
                sliceRenderRanges: function (t) {
                    return this.isInverse() ? this.sliceInverseRenderRanges(t) : this.sliceNormalRenderRanges(t)
                },
                sliceNormalRenderRanges: function (t) {
                    var e, n, i, r = this.eventInstances, s = [];
                    for (e = 0; e < r.length; e++) n = r[e], (i = n.dateProfile.unzonedRange.intersect(t)) && s.push(new en(i, n.def, n));
                    return s
                },
                sliceInverseRenderRanges: function (t) {
                    var e = this.eventInstances.map(Ft), n = this.getEventDef();
                    return e = It(e, t), e.map(function (t) {
                        return new en(t, n)
                    })
                },
                isInverse: function () {
                    return this.getEventDef().hasInverseRendering()
                },
                getEventDef: function () {
                    return this.explicitEventDef || this.eventInstances[0].def
                }
            }), tn = dt.extend({
                start: null, end: null, unzonedRange: null, constructor: function (t, e, n) {
                    this.start = t, this.end = e || null, this.unzonedRange = this.buildUnzonedRange(n)
                }, isAllDay: function () {
                    return !(this.start.hasTime() || this.end && this.end.hasTime())
                }, buildUnzonedRange: function (t) {
                    var e = this.start.clone().stripZone().valueOf(), n = this.getEnd(t).stripZone().valueOf();
                    return new Ue(e, n)
                }, getEnd: function (t) {
                    return this.end ? this.end.clone() : t.getDefaultEventEnd(this.isAllDay(), this.start)
                }
            });
            tn.isStandardProp = function (t) {
                return "start" === t || "date" === t || "end" === t || "allDay" === t
            }, tn.parse = function (t, e) {
                var n = t.start || t.date, i = t.end;
                if (!n) return !1;
                var r = e.calendar, s = r.moment(n), o = i ? r.moment(i) : null, a = t.allDay,
                    l = r.opt("forceEventDuration");
                return !!s.isValid() && (!o || o.isValid() && o.isAfter(s) || (o = null), null == a && null == (a = e.allDayDefault) && (a = r.opt("allDayDefault")), !0 === a ? (s.stripTime(), o && o.stripTime()) : !1 === a && (s.hasTime() || s.time(0), o && !o.hasTime() && o.time(0)), !o && l && (o = r.getDefaultEventEnd(!s.hasTime(), s)), new tn(s, o, r))
            };
            var en = dt.extend({
                unzonedRange: null,
                eventDef: null,
                eventInstance: null,
                constructor: function (t, e, n) {
                    this.unzonedRange = t, this.eventDef = e, n && (this.eventInstance = n)
                }
            }), nn = Wt.EventFootprint = dt.extend({
                componentFootprint: null,
                eventDef: null,
                eventInstance: null,
                constructor: function (t, e, n) {
                    this.componentFootprint = t, this.eventDef = e, n && (this.eventInstance = n)
                },
                getEventLegacy: function () {
                    return (this.eventInstance || this.eventDef).toLegacy()
                }
            }), rn = Wt.EventDefMutation = dt.extend({
                dateMutation: null,
                eventDefId: null,
                className: null,
                verbatimStandardProps: null,
                miscProps: null,
                mutateSingle: function (t) {
                    var e;
                    return this.dateMutation && (e = t.dateProfile, t.dateProfile = this.dateMutation.buildNewDateProfile(e, t.source.calendar)), null != this.eventDefId && (t.id = Qe.normalizeId(t.rawId = this.eventDefId)), this.className && (t.className = this.className), this.verbatimStandardProps && $e.copyVerbatimStandardProps(this.verbatimStandardProps, t), this.miscProps && t.applyMiscProps(this.miscProps), e ? function () {
                        t.dateProfile = e
                    } : function () {
                    }
                },
                setDateMutation: function (t) {
                    t && !t.isEmpty() ? this.dateMutation = t : this.dateMutation = null
                },
                isEmpty: function () {
                    return !this.dateMutation
                }
            });
            rn.createFromRawProps = function (t, e, n) {
                var i, r, s, o, a = t.def, l = {}, u = {}, c = {}, h = {}, d = null, f = null;
                for (i in e) tn.isStandardProp(i) ? l[i] = e[i] : a.isStandardProp(i) ? u[i] = e[i] : a.miscProps[i] !== e[i] && (c[i] = e[i]);
                return r = tn.parse(l, a.source), r && (s = sn.createFromDiff(t.dateProfile, r, n)), u.id !== a.id && (d = u.id), J(u.className, a.className) || (f = u.className), Qe.copyVerbatimStandardProps(u, h), o = new rn, o.eventDefId = d, o.className = f, o.verbatimStandardProps = h, o.miscProps = c, s && (o.dateMutation = s), o
            };
            var sn = dt.extend({
                clearEnd: !1,
                forceTimed: !1,
                forceAllDay: !1,
                dateDelta: null,
                startDelta: null,
                endDelta: null,
                buildNewDateProfile: function (t, e) {
                    var n = t.start.clone(), i = null, r = !1;
                    return t.end && !this.clearEnd ? i = t.end.clone() : this.endDelta && !i && (i = e.getDefaultEventEnd(t.isAllDay(), n)), this.forceTimed ? (r = !0, n.hasTime() || n.time(0), i && !i.hasTime() && i.time(0)) : this.forceAllDay && (n.hasTime() && n.stripTime(), i && i.hasTime() && i.stripTime()), this.dateDelta && (r = !0, n.add(this.dateDelta), i && i.add(this.dateDelta)), this.endDelta && (r = !0, i.add(this.endDelta)), this.startDelta && (r = !0, n.add(this.startDelta)), r && (n = e.applyTimezone(n), i && (i = e.applyTimezone(i))), !i && e.opt("forceEventDuration") && (i = e.getDefaultEventEnd(t.isAllDay(), n)), new tn(n, i, e)
                },
                setDateDelta: function (t) {
                    t && t.valueOf() ? this.dateDelta = t : this.dateDelta = null
                },
                setStartDelta: function (t) {
                    t && t.valueOf() ? this.startDelta = t : this.startDelta = null
                },
                setEndDelta: function (t) {
                    t && t.valueOf() ? this.endDelta = t : this.endDelta = null
                },
                isEmpty: function () {
                    return !(this.clearEnd || this.forceTimed || this.forceAllDay || this.dateDelta || this.startDelta || this.endDelta)
                }
            });
            sn.createFromDiff = function (t, e, n) {
                function i(t, i) {
                    return n ? L(t, i, n) : e.isAllDay() ? A(t, i) : B(t, i)
                }

                var r, s, o, a, l = t.end && !e.end, u = t.isAllDay() && !e.isAllDay(),
                    c = !t.isAllDay() && e.isAllDay();
                return r = i(e.start, t.start), e.end && (s = i(e.unzonedRange.getEnd(), t.unzonedRange.getEnd()), o = s.subtract(r)), a = new sn, a.clearEnd = l, a.forceTimed = u, a.forceAllDay = c, a.setDateDelta(r), a.setEndDelta(o), a
            };
            var on = dt.extend(oe, {
                calendar: null,
                id: null,
                uid: null,
                color: null,
                backgroundColor: null,
                borderColor: null,
                textColor: null,
                className: null,
                editable: null,
                startEditable: null,
                durationEditable: null,
                rendering: null,
                overlap: null,
                constraint: null,
                allDayDefault: null,
                eventDataTransform: null,
                constructor: function (t) {
                    this.calendar = t, this.className = [], this.uid = String(on.uuid++)
                },
                fetch: function (t, e, n) {
                },
                removeEventDefsById: function (t) {
                },
                removeAllEventDefs: function () {
                },
                getPrimitive: function (t) {
                },
                parseEventDefs: function (t) {
                    var e, n, i = [];
                    for (e = 0; e < t.length; e++) (n = Ze.parse(t[e], this)) && i.push(n);
                    return i
                },
                applyManualStandardProps: function (e) {
                    return null != e.id && (this.id = on.normalizeId(e.id)), t.isArray(e.className) ? this.className = e.className : "string" == typeof e.className && (this.className = e.className.split(/\s+/)), !0
                }
            });
            on.defineStandardProps = ae, on.uuid = 0, on.normalizeId = function (t) {
                return t ? String(t) : null
            }, on.defineStandardProps({
                id: !1,
                className: !1,
                color: !0,
                backgroundColor: !0,
                borderColor: !0,
                textColor: !0,
                editable: !0,
                startEditable: !0,
                durationEditable: !0,
                rendering: !0,
                overlap: !0,
                constraint: !0,
                allDayDefault: !0,
                eventDataTransform: !0
            }), on.parse = function (t, e) {
                var n = new this(e);
                return !("object" != typeof t || !n.applyProps(t)) && n
            }, Wt.EventSource = on;
            var an = {
                sourceClasses: [], registerClass: function (t) {
                    this.sourceClasses.unshift(t)
                }, parse: function (t, e) {
                    var n, i, r = this.sourceClasses;
                    for (n = 0; n < r.length; n++) if (i = r[n].parse(t, e)) return i
                }
            };
            Wt.EventSourceParser = an;
            var ln = on.extend({
                rawEventDefs: null, eventDefs: null, currentTimezone: null, constructor: function (t) {
                    on.apply(this, arguments), this.eventDefs = []
                }, setRawEventDefs: function (t) {
                    this.rawEventDefs = t, this.eventDefs = this.parseEventDefs(t)
                }, fetch: function (t, e, n) {
                    var i, r = this.eventDefs;
                    if (null !== this.currentTimezone && this.currentTimezone !== n) for (i = 0; i < r.length; i++) r[i] instanceof $e && r[i].rezone();
                    return this.currentTimezone = n, ce.resolve(r)
                }, addEventDef: function (t) {
                    this.eventDefs.push(t)
                }, removeEventDefsById: function (t) {
                    return X(this.eventDefs, function (e) {
                        return e.id === t
                    })
                }, removeAllEventDefs: function () {
                    this.eventDefs = []
                }, getPrimitive: function () {
                    return this.rawEventDefs
                }, applyManualStandardProps: function (t) {
                    var e = on.prototype.applyManualStandardProps.apply(this, arguments);
                    return this.setRawEventDefs(t.events), e
                }
            });
            ln.defineStandardProps({events: !1}), ln.parse = function (e, n) {
                var i;
                return t.isArray(e.events) ? i = e : t.isArray(e) && (i = {events: e}), !!i && on.parse.call(this, i, n)
            }, an.registerClass(ln), Wt.ArrayEventSource = ln;
            var un = on.extend({
                func: null, fetch: function (t, e, n) {
                    var i = this;
                    return this.calendar.pushLoading(), ce.construct(function (r) {
                        i.func.call(i.calendar, t.clone(), e.clone(), n, function (t) {
                            i.calendar.popLoading(), r(i.parseEventDefs(t))
                        })
                    })
                }, getPrimitive: function () {
                    return this.func
                }, applyManualStandardProps: function (t) {
                    var e = on.prototype.applyManualStandardProps.apply(this, arguments);
                    return this.func = t.events, e
                }
            });
            un.defineStandardProps({events: !1}), un.parse = function (e, n) {
                var i;
                return t.isFunction(e.events) ? i = e : t.isFunction(e) && (i = {events: e}), !!i && on.parse.call(this, i, n)
            }, an.registerClass(un), Wt.FuncEventSource = un;
            var cn = on.extend({
                url: null,
                startParam: null,
                endParam: null,
                timezoneParam: null,
                ajaxSettings: null,
                fetch: function (e, n, i) {
                    var r = this, s = this.ajaxSettings, o = s.success, a = s.error,
                        l = this.buildRequestParams(e, n, i);
                    return this.calendar.pushLoading(), ce.construct(function (e, n) {
                        t.ajax(t.extend({}, cn.AJAX_DEFAULTS, s, {
                            url: r.url, data: l, success: function (i) {
                                var s;
                                r.calendar.popLoading(), i ? (s = $(o, this, arguments), t.isArray(s) && (i = s), e(r.parseEventDefs(i))) : n()
                            }, error: function () {
                                r.calendar.popLoading(), $(a, this, arguments), n()
                            }
                        }))
                    })
                },
                buildRequestParams: function (e, n, i) {
                    var r, s, o, a, l = this.calendar, u = this.ajaxSettings, c = {};
                    return r = this.startParam, null == r && (r = l.opt("startParam")), s = this.endParam, null == s && (s = l.opt("endParam")), o = this.timezoneParam, null == o && (o = l.opt("timezoneParam")), a = t.isFunction(u.data) ? u.data() : u.data || {}, t.extend(c, a), c[r] = e.format(), c[s] = n.format(), i && "local" !== i && (c[o] = i), c
                },
                getPrimitive: function () {
                    return this.url
                },
                applyMiscProps: function (t) {
                    on.prototype.applyMiscProps.apply(this, arguments), this.ajaxSettings = t
                }
            });
            cn.AJAX_DEFAULTS = {dataType: "json", cache: !1}, cn.defineStandardProps({
                url: !0,
                startParam: !0,
                endParam: !0,
                timezoneParam: !0
            }), cn.parse = function (t, e) {
                var n;
                return "string" == typeof t.url ? n = t : "string" == typeof t && (n = {url: t}), !!n && on.parse.call(this, n, e)
            }, an.registerClass(cn), Wt.JsonFeedEventSource = cn;
            var hn = Wt.ThemeRegistry = {
                themeClassHash: {}, register: function (t, e) {
                    this.themeClassHash[t] = e
                }, getThemeClass: function (t) {
                    return t ? !0 === t ? gn : this.themeClassHash[t] : fn
                }
            }, dn = Wt.Theme = dt.extend({
                classes: {},
                iconClasses: {},
                baseIconClass: "",
                iconOverrideOption: null,
                iconOverrideCustomButtonOption: null,
                iconOverridePrefix: "",
                constructor: function (t) {
                    this.optionsModel = t, this.processIconOverride()
                },
                processIconOverride: function () {
                    this.iconOverrideOption && this.setIconOverride(this.optionsModel.get(this.iconOverrideOption))
                },
                setIconOverride: function (e) {
                    var n, i;
                    if (t.isPlainObject(e)) {
                        n = t.extend({}, this.iconClasses);
                        for (i in e) n[i] = this.applyIconOverridePrefix(e[i]);
                        this.iconClasses = n
                    } else !1 === e && (this.iconClasses = {})
                },
                applyIconOverridePrefix: function (t) {
                    var e = this.iconOverridePrefix;
                    return e && 0 !== t.indexOf(e) && (t = e + t), t
                },
                getClass: function (t) {
                    return this.classes[t] || ""
                },
                getIconClass: function (t) {
                    var e = this.iconClasses[t];
                    return e ? this.baseIconClass + " " + e : ""
                },
                getCustomButtonIconClass: function (t) {
                    var e;
                    return this.iconOverrideCustomButtonOption && (e = t[this.iconOverrideCustomButtonOption]) ? this.baseIconClass + " " + this.applyIconOverridePrefix(e) : ""
                }
            }), fn = dn.extend({
                classes: {
                    widget: "fc-unthemed",
                    widgetHeader: "fc-widget-header",
                    widgetContent: "fc-widget-content",
                    buttonGroup: "fc-button-group",
                    button: "fc-button",
                    cornerLeft: "fc-corner-left",
                    cornerRight: "fc-corner-right",
                    stateDefault: "fc-state-default",
                    stateActive: "fc-state-active",
                    stateDisabled: "fc-state-disabled",
                    stateHover: "fc-state-hover",
                    stateDown: "fc-state-down",
                    popoverHeader: "fc-widget-header",
                    popoverContent: "fc-widget-content",
                    headerRow: "fc-widget-header",
                    dayRow: "fc-widget-content",
                    listView: "fc-widget-content"
                },
                baseIconClass: "fc-icon",
                iconClasses: {
                    close: "fc-icon-x",
                    prev: "fc-icon-left-single-arrow",
                    next: "fc-icon-right-single-arrow",
                    prevYear: "fc-icon-left-double-arrow",
                    nextYear: "fc-icon-right-double-arrow"
                },
                iconOverrideOption: "buttonIcons",
                iconOverrideCustomButtonOption: "icon",
                iconOverridePrefix: "fc-icon-"
            });
            hn.register("standard", fn);
            var gn = dn.extend({
                classes: {
                    widget: "ui-widget",
                    widgetHeader: "ui-widget-header",
                    widgetContent: "ui-widget-content",
                    buttonGroup: "fc-button-group",
                    button: "ui-button",
                    cornerLeft: "ui-corner-left",
                    cornerRight: "ui-corner-right",
                    stateDefault: "ui-state-default",
                    stateActive: "ui-state-active",
                    stateDisabled: "ui-state-disabled",
                    stateHover: "ui-state-hover",
                    stateDown: "ui-state-down",
                    today: "ui-state-highlight",
                    popoverHeader: "ui-widget-header",
                    popoverContent: "ui-widget-content",
                    headerRow: "ui-widget-header",
                    dayRow: "ui-widget-content",
                    listView: "ui-widget-content"
                },
                baseIconClass: "ui-icon",
                iconClasses: {
                    close: "ui-icon-closethick",
                    prev: "ui-icon-circle-triangle-w",
                    next: "ui-icon-circle-triangle-e",
                    prevYear: "ui-icon-seek-prev",
                    nextYear: "ui-icon-seek-next"
                },
                iconOverrideOption: "themeButtonIcons",
                iconOverrideCustomButtonOption: "themeIcon",
                iconOverridePrefix: "ui-icon-"
            });
            hn.register("jquery-ui", gn);
            var pn = dn.extend({
                classes: {
                    widget: "fc-bootstrap3",
                    tableGrid: "table-bordered",
                    tableList: "table table-striped",
                    buttonGroup: "btn-group",
                    button: "btn btn-default",
                    stateActive: "active",
                    stateDisabled: "disabled",
                    today: "alert alert-info",
                    popover: "panel panel-default",
                    popoverHeader: "panel-heading",
                    popoverContent: "panel-body",
                    headerRow: "panel-default",
                    dayRow: "panel-default",
                    listView: "panel panel-default"
                },
                baseIconClass: "glyphicon",
                iconClasses: {
                    close: "glyphicon-remove",
                    prev: "glyphicon-chevron-left",
                    next: "glyphicon-chevron-right",
                    prevYear: "glyphicon-backward",
                    nextYear: "glyphicon-forward"
                },
                iconOverrideOption: "bootstrapGlyphicons",
                iconOverrideCustomButtonOption: "bootstrapGlyphicon",
                iconOverridePrefix: "glyphicon-"
            });
            hn.register("bootstrap3", pn);
            var vn = xe.extend({
                fillSegTag: "td", attachSegEls: function (t, e) {
                    var n, i, r, s = [];
                    for (n = 0; n < e.length; n++) i = e[n], r = this.renderFillRow(t, i), this.component.rowEls.eq(i.row).append(r), s.push(r[0]);
                    return s
                }, renderFillRow: function (e, n) {
                    var i, r, s, o = this.component.colCnt, a = n.leftCol, l = n.rightCol + 1;
                    return i = "businessHours" === e ? "bgevent" : e.toLowerCase(), r = t('<div class="fc-' + i + '-skeleton"><table><tr/></table></div>'), s = r.find("tr"), a > 0 && s.append('<td colspan="' + a + '"/>'), s.append(n.el.attr("colspan", l - a)), l < o && s.append('<td colspan="' + (o - l) + '"/>'), this.component.bookendCells(s), r
                }
            }), mn = He.extend({
                dayGrid: null, rowStructs: null, constructor: function (t) {
                    He.apply(this, arguments), this.dayGrid = t
                }, renderBgRanges: function (e) {
                    e = t.grep(e, function (t) {
                        return t.eventDef.isAllDay()
                    }), He.prototype.renderBgRanges.call(this, e)
                }, renderFgSegs: function (e) {
                    var n = this.rowStructs = this.renderSegRows(e);
                    this.dayGrid.rowEls.each(function (e, i) {
                        t(i).find(".fc-content-skeleton > table").append(n[e].tbodyEl)
                    })
                }, unrenderFgSegs: function () {
                    for (var t, e = this.rowStructs || []; t = e.pop();) t.tbodyEl.remove();
                    this.rowStructs = null
                }, renderSegRows: function (t) {
                    var e, n, i = [];
                    for (e = this.groupSegRows(t), n = 0; n < e.length; n++) i.push(this.renderSegRow(n, e[n]));
                    return i
                }, renderSegRow: function (e, n) {
                    function i(e) {
                        for (; o < e;) c = (m[r - 1] || [])[o], c ? c.attr("rowspan", parseInt(c.attr("rowspan") || 1, 10) + 1) : (c = t("<td/>"), a.append(c)), v[r][o] = c, m[r][o] = c, o++
                    }

                    var r, s, o, a, l, u, c, h = this.dayGrid.colCnt, d = this.buildSegLevels(n),
                        f = Math.max(1, d.length), g = t("<tbody/>"), p = [], v = [], m = [];
                    for (r = 0; r < f; r++) {
                        if (s = d[r], o = 0, a = t("<tr/>"), p.push([]), v.push([]), m.push([]), s) for (l = 0; l < s.length; l++) {
                            for (u = s[l], i(u.leftCol), c = t('<td class="fc-event-container"/>').append(u.el), u.leftCol != u.rightCol ? c.attr("colspan", u.rightCol - u.leftCol + 1) : m[r][o] = c; o <= u.rightCol;) v[r][o] = c, p[r][o] = u, o++;
                            a.append(c)
                        }
                        i(h), this.dayGrid.bookendCells(a), g.append(a)
                    }
                    return {row: e, tbodyEl: g, cellMatrix: v, segMatrix: p, segLevels: d, segs: n}
                }, buildSegLevels: function (t) {
                    var e, n, i, r = [];
                    for (this.sortEventSegs(t), e = 0; e < t.length; e++) {
                        for (n = t[e], i = 0; i < r.length && Bt(n, r[i]); i++) ;
                        n.level = i, (r[i] || (r[i] = [])).push(n)
                    }
                    for (i = 0; i < r.length; i++) r[i].sort(At);
                    return r
                }, groupSegRows: function (t) {
                    var e, n = [];
                    for (e = 0; e < this.dayGrid.rowCnt; e++) n.push([]);
                    for (e = 0; e < t.length; e++) n[t[e].row].push(t[e]);
                    return n
                }, computeEventTimeFormat: function () {
                    return this.opt("extraSmallTimeFormat")
                }, computeDisplayEventEnd: function () {
                    return 1 === this.dayGrid.colCnt
                }, fgSegHtml: function (t, e) {
                    var n, i, r = this.view, s = t.footprint.eventDef, o = t.footprint.componentFootprint.isAllDay,
                        a = r.isEventDefDraggable(s), l = !e && o && t.isStart && r.isEventDefResizableFromStart(s),
                        u = !e && o && t.isEnd && r.isEventDefResizableFromEnd(s), c = this.getSegClasses(t, a, l || u),
                        h = it(this.getSkinCss(s)), d = "";
                    return c.unshift("fc-day-grid-event", "fc-h-event"), t.isStart && (n = this.getTimeText(t.footprint)) && (d = ''), i = '<span class="fc-title">' + (et(s.title || "") || "&nbsp;") + "</span>", '<a class="' + c.join(" ") + '"' + (s.url ? ' href="' + et(s.url) + '"' : "") + (h ? ' style="' + h + '"' : "") + '><div class="fc-content">' + (this.isRTL ? i + " " + d : d + " " + i) + "</div>" + (l ? '<div class="fc-resizer fc-start-resizer" />' : "") + (u ? '<div class="fc-resizer fc-end-resizer" />' : "") + "</a>"
                }
            }), yn = Pe.extend({
                renderSegs: function (e, n) {
                    var i, r = [];
                    return i = this.eventRenderer.renderSegRows(e), this.component.rowEls.each(function (e, s) {
                        var o, a, l = t(s), u = t('<div class="fc-helper-skeleton"><table/></div>');
                        n && n.row === e ? a = n.el.position().top : (o = l.find(".fc-content-skeleton tbody"), o.length || (o = l.find(".fc-content-skeleton table")), a = o.position().top), u.css("top", a).find("table").append(i[e].tbodyEl), l.append(u), r.push(u[0])
                    }), t(r)
                }
            }), wn = Wt.DayGrid = ke.extend(Ie, Be, {
                eventRendererClass: mn,
                businessHourRendererClass: Me,
                helperRendererClass: yn,
                fillRendererClass: vn,
                view: null,
                helperRenderer: null,
                cellWeekNumbersVisible: !1,
                bottomCoordPadding: 0,
                headContainerEl: null,
                rowEls: null,
                cellEls: null,
                rowCoordCache: null,
                colCoordCache: null,
                isRigid: !1,
                hasAllDayBusinessHours: !0,
                constructor: function (t) {
                    this.view = t, ke.call(this)
                },
                componentFootprintToSegs: function (t) {
                    var e, n, i = this.sliceRangeByRow(t.unzonedRange);
                    for (e = 0; e < i.length; e++) n = i[e], this.isRTL ? (n.leftCol = this.daysPerRow - 1 - n.lastRowDayIndex, n.rightCol = this.daysPerRow - 1 - n.firstRowDayIndex) : (n.leftCol = n.firstRowDayIndex, n.rightCol = n.lastRowDayIndex);
                    return i
                },
                renderDates: function (t) {
                    this.dateProfile = t, this.updateDayTable(), this.renderGrid()
                },
                unrenderDates: function () {
                    this.removeSegPopover()
                },
                renderGrid: function () {
                    var t, e, n = this.view, i = this.rowCnt, r = this.colCnt, s = "";
                    for (this.headContainerEl && this.headContainerEl.html(this.renderHeadHtml()), t = 0; t < i; t++) s += this.renderDayRowHtml(t, this.isRigid);
                    for (this.el.html(s), this.rowEls = this.el.find(".fc-row"), this.cellEls = this.el.find(".fc-day, .fc-disabled-day"), this.rowCoordCache = new ge({
                        els: this.rowEls,
                        isVertical: !0
                    }), this.colCoordCache = new ge({
                        els: this.cellEls.slice(0, this.colCnt),
                        isHorizontal: !0
                    }), t = 0; t < i; t++) for (e = 0; e < r; e++) this.publiclyTrigger("dayRender", {
                        context: n,
                        args: [this.getCellDate(t, e), this.getCellEl(t, e), n]
                    })
                },
                renderDayRowHtml: function (t, e) {
                    var n = this.view.calendar.theme, i = ["fc-row", "fc-week", n.getClass("dayRow")];
                    return e && i.push("fc-rigid"), '<div class="' + i.join(" ") + '"><div class="fc-bg"><table class="' + n.getClass("tableGrid") + '">' + this.renderBgTrHtml(t) + '</table></div><div class="fc-content-skeleton"><table>' + (this.getIsNumbersVisible() ? "<thead>" + this.renderNumberTrHtml(t) + "</thead>" : "") + "</table></div></div>"
                },
                getIsNumbersVisible: function () {
                    return this.getIsDayNumbersVisible() || this.cellWeekNumbersVisible
                },
                getIsDayNumbersVisible: function () {
                    return this.rowCnt > 1
                },
                renderNumberTrHtml: function (t) {
                    return "<tr>" + (this.isRTL ? "" : this.renderNumberIntroHtml(t)) + this.renderNumberCellsHtml(t) + (this.isRTL ? this.renderNumberIntroHtml(t) : "") + "</tr>"
                },
                renderNumberIntroHtml: function (t) {
                    return this.renderIntroHtml()
                },
                renderNumberCellsHtml: function (t) {
                    var e, n, i = [];
                    for (e = 0; e < this.colCnt; e++) n = this.getCellDate(t, e), i.push(this.renderNumberCellHtml(n));
                    return i.join("")
                },
                renderNumberCellHtml: function (t) {
                    var e, n, i = this.view, r = "", s = this.dateProfile.activeUnzonedRange.containsDate(t),
                        o = this.getIsDayNumbersVisible() && s;
                    return o || this.cellWeekNumbersVisible ? (e = this.getDayClasses(t), e.unshift("fc-day-top"), this.cellWeekNumbersVisible && (n = "ISO" === t._locale._fullCalendar_weekCalc ? 1 : t._locale.firstDayOfWeek()), r += '<td class="' + e.join(" ") + '"' + (s ? ' data-date="' + t.format() + '"' : "") + ">", this.cellWeekNumbersVisible && t.day() == n && (r += i.buildGotoAnchorHtml({
                        date: t,
                        type: "week"
                    }, {class: "fc-week-number"}, t.format("w"))), o && (r += i.buildGotoAnchorHtml(t, {class: "fc-day-number"}, t.date())), r += "</td>") : "<td/>"
                },
                prepareHits: function () {
                    this.colCoordCache.build(), this.rowCoordCache.build(), this.rowCoordCache.bottoms[this.rowCnt - 1] += this.bottomCoordPadding
                },
                releaseHits: function () {
                    this.colCoordCache.clear(), this.rowCoordCache.clear()
                },
                queryHit: function (t, e) {
                    if (this.colCoordCache.isLeftInBounds(t) && this.rowCoordCache.isTopInBounds(e)) {
                        var n = this.colCoordCache.getHorizontalIndex(t), i = this.rowCoordCache.getVerticalIndex(e);
                        if (null != i && null != n) return this.getCellHit(i, n)
                    }
                },
                getHitFootprint: function (t) {
                    var e = this.getCellRange(t.row, t.col);
                    return new We(new Ue(e.start, e.end), !0)
                },
                getHitEl: function (t) {
                    return this.getCellEl(t.row, t.col)
                },
                getCellHit: function (t, e) {
                    return {
                        row: t,
                        col: e,
                        component: this,
                        left: this.colCoordCache.getLeftOffset(e),
                        right: this.colCoordCache.getRightOffset(e),
                        top: this.rowCoordCache.getTopOffset(t),
                        bottom: this.rowCoordCache.getBottomOffset(t)
                    }
                },
                getCellEl: function (t, e) {
                    return this.cellEls.eq(t * this.colCnt + e)
                },
                unrenderEvents: function () {
                    this.removeSegPopover(), ke.prototype.unrenderEvents.apply(this, arguments)
                },
                getOwnEventSegs: function () {
                    return ke.prototype.getOwnEventSegs.apply(this, arguments).concat(this.popoverSegs || [])
                },
                renderDrag: function (t, e, n) {
                    var i;
                    for (i = 0; i < t.length; i++) this.renderHighlight(t[i].componentFootprint);
                    if (t.length && e && e.component !== this) return this.helperRenderer.renderEventDraggingFootprints(t, e, n), !0
                },
                unrenderDrag: function (t) {
                    this.unrenderHighlight(), this.helperRenderer.unrender()
                },
                renderEventResize: function (t, e, n) {
                    var i;
                    for (i = 0; i < t.length; i++) this.renderHighlight(t[i].componentFootprint);
                    this.helperRenderer.renderEventResizingFootprints(t, e, n)
                },
                unrenderEventResize: function (t) {
                    this.unrenderHighlight(), this.helperRenderer.unrender()
                }
            });
            wn.mixin({
                segPopover: null, popoverSegs: null, removeSegPopover: function () {
                    this.segPopover && this.segPopover.hide()
                }, limitRows: function (t) {
                    var e, n, i = this.eventRenderer.rowStructs || [];
                    for (e = 0; e < i.length; e++) this.unlimitRow(e), !1 !== (n = !!t && ("number" == typeof t ? t : this.computeRowLevelLimit(e))) && this.limitRow(e, n)
                }, computeRowLevelLimit: function (e) {
                    function n(e, n) {
                        s = Math.max(s, t(n).outerHeight())
                    }

                    var i, r, s, o = this.rowEls.eq(e), a = o.height(),
                        l = this.eventRenderer.rowStructs[e].tbodyEl.children();
                    for (i = 0; i < l.length; i++) if (r = l.eq(i).removeClass("fc-limited"), s = 0, r.find("> td > :first-child").each(n), r.position().top + s > a) return i;
                    return !1
                }, limitRow: function (e, n) {
                    function i(i) {
                        for (; E < i;) u = w.getCellSegs(e, E, n), u.length && (d = s[n - 1][E], y = w.renderMoreLink(e, E, u), m = t("<div/>").append(y), d.append(m), b.push(m[0])), E++
                    }

                    var r, s, o, a, l, u, c, h, d, f, g, p, v, m, y, w = this, D = this.eventRenderer.rowStructs[e],
                        b = [], E = 0;
                    if (n && n < D.segLevels.length) {
                        for (r = D.segLevels[n - 1], s = D.cellMatrix, o = D.tbodyEl.children().slice(n).addClass("fc-limited").get(), a = 0; a < r.length; a++) {
                            for (l = r[a], i(l.leftCol), h = [], c = 0; E <= l.rightCol;) u = this.getCellSegs(e, E, n), h.push(u), c += u.length, E++;
                            if (c) {
                                for (d = s[n - 1][l.leftCol], f = d.attr("rowspan") || 1, g = [], p = 0; p < h.length; p++) v = t('<td class="fc-more-cell"/>').attr("rowspan", f), u = h[p], y = this.renderMoreLink(e, l.leftCol + p, [l].concat(u)), m = t("<div/>").append(y), v.append(m), g.push(v[0]), b.push(v[0]);
                                d.addClass("fc-limited").after(t(g)), o.push(d[0])
                            }
                        }
                        i(this.colCnt), D.moreEls = t(b), D.limitedEls = t(o)
                    }
                }, unlimitRow: function (t) {
                    var e = this.eventRenderer.rowStructs[t];
                    e.moreEls && (e.moreEls.remove(), e.moreEls = null), e.limitedEls && (e.limitedEls.removeClass("fc-limited"), e.limitedEls = null)
                }, renderMoreLink: function (e, n, i) {
                    var r = this, s = this.view;
                    return t('<a class="fc-more"/>').text(this.getMoreLinkText(i.length)).on("click", function (o) {
                        var a = r.opt("eventLimitClick"), l = r.getCellDate(e, n), u = t(this), c = r.getCellEl(e, n),
                            h = r.getCellSegs(e, n), d = r.resliceDaySegs(h, l), f = r.resliceDaySegs(i, l);
                        "function" == typeof a && (a = r.publiclyTrigger("eventLimitClick", {
                            context: s,
                            args: [{date: l.clone(), dayEl: c, moreEl: u, segs: d, hiddenSegs: f}, o, s]
                        })), "popover" === a ? r.showSegPopover(e, n, u, d) : "string" == typeof a && s.calendar.zoomTo(l, a)
                    })
                }, showSegPopover: function (t, e, n, i) {
                    var r, s, o = this, a = this.view, l = n.parent();
                    r = 1 == this.rowCnt ? a.el : this.rowEls.eq(t), s = {
                        className: "fc-more-popover " + a.calendar.theme.getClass("popover"),
                        content: this.renderSegPopoverContent(t, e, i),
                        parentEl: a.el,
                        top: r.offset().top,
                        autoHide: !0,
                        viewportConstrain: this.opt("popoverViewportConstrain"),
                        hide: function () {
                            o.popoverSegs && o.triggerBeforeEventSegsDestroyed(o.popoverSegs), o.segPopover.removeElement(), o.segPopover = null, o.popoverSegs = null
                        }
                    }, this.isRTL ? s.right = l.offset().left + l.outerWidth() + 1 : s.left = l.offset().left - 1, this.segPopover = new fe(s), this.segPopover.show(), this.bindAllSegHandlersToEl(this.segPopover.el), this.triggerAfterEventSegsRendered(i)
                }, renderSegPopoverContent: function (e, n, i) {
                    var r, s = this.view, o = s.calendar.theme,
                        a = this.getCellDate(e, n).format(this.opt("dayPopoverFormat")),
                        l = t('<div class="fc-header ' + o.getClass("popoverHeader") + '"><span class="fc-close ' + o.getIconClass("close") + '"></span><span class="fc-title">' + et(a) + '</span><div class="fc-clear"/></div><div class="fc-body ' + o.getClass("popoverContent") + '"><div class="fc-event-container"></div></div>'),
                        u = l.find(".fc-event-container");
                    for (i = this.eventRenderer.renderFgSegEls(i, !0), this.popoverSegs = i, r = 0; r < i.length; r++) this.hitsNeeded(), i[r].hit = this.getCellHit(e, n), this.hitsNotNeeded(), u.append(i[r].el);
                    return l
                }, resliceDaySegs: function (e, n) {
                    var i, r, s, o = n.clone(), a = o.clone().add(1, "days"), l = new Ue(o, a), u = [];
                    for (i = 0; i < e.length; i++) r = e[i], (s = r.footprint.componentFootprint.unzonedRange.intersect(l)) && u.push(t.extend({}, r, {
                        footprint: new nn(new We(s, r.footprint.componentFootprint.isAllDay), r.footprint.eventDef, r.footprint.eventInstance),
                        isStart: r.isStart && s.isStart,
                        isEnd: r.isEnd && s.isEnd
                    }));
                    return this.eventRenderer.sortEventSegs(u), u
                }, getMoreLinkText: function (t) {
                    var e = this.opt("eventLimitText");
                    return "function" == typeof e ? e(t) : "+" + t + " " + e
                }, getCellSegs: function (t, e, n) {
                    for (var i, r = this.eventRenderer.rowStructs[t].segMatrix, s = n || 0, o = []; s < r.length;) i = r[s][e], i && o.push(i), s++;
                    return o
                }
            });
            var Dn = Wt.BasicView = Ae.extend({
                scroller: null, dayGridClass: wn, dayGrid: null, weekNumberWidth: null, constructor: function () {
                    Ae.apply(this, arguments), this.dayGrid = this.instantiateDayGrid(), this.dayGrid.isRigid = this.hasRigidRows(), this.opt("weekNumbers") && (this.opt("weekNumbersWithinDays") ? (this.dayGrid.cellWeekNumbersVisible = !0, this.dayGrid.colWeekNumbersVisible = !1) : (this.dayGrid.cellWeekNumbersVisible = !1, this.dayGrid.colWeekNumbersVisible = !0)), this.addChild(this.dayGrid), this.scroller = new we({
                        overflowX: "hidden",
                        overflowY: "auto"
                    })
                }, instantiateDayGrid: function () {
                    return new (this.dayGridClass.extend(bn))(this)
                }, buildRenderRange: function (t, e, n) {
                    var i = Ae.prototype.buildRenderRange.apply(this, arguments),
                        r = this.calendar.msToUtcMoment(i.startMs, n), s = this.calendar.msToUtcMoment(i.endMs, n);
                    return /^(year|month)$/.test(e) && (r.startOf("week"), s.weekday() && s.add(1, "week").startOf("week")), new Ue(r, s)
                }, executeDateRender: function (t) {
                    this.dayGrid.breakOnWeeks = /year|month|week/.test(t.currentRangeUnit), Ae.prototype.executeDateRender.apply(this, arguments)
                }, renderSkeleton: function () {
                    var e, n;
                    this.el.addClass("fc-basic-view").html(this.renderSkeletonHtml()), this.scroller.render(), e = this.scroller.el.addClass("fc-day-grid-container"), n = t('<div class="fc-day-grid" />').appendTo(e), this.el.find(".fc-body > tr > td").append(e), this.dayGrid.headContainerEl = this.el.find(".fc-head-container"), this.dayGrid.setElement(n)
                }, unrenderSkeleton: function () {
                    this.dayGrid.removeElement(), this.scroller.destroy()
                }, renderSkeletonHtml: function () {
                    var t = this.calendar.theme;
                    return '<table class="' + t.getClass("tableGrid") + '">' + (this.opt("columnHeader") ? '<thead class="fc-head"><tr><td class="fc-head-container ' + t.getClass("widgetHeader") + '">&nbsp;</td></tr></thead>' : "") + '<tbody class="fc-body"><tr><td class="' + t.getClass("widgetContent") + '"></td></tr></tbody></table>'
                }, weekNumberStyleAttr: function () {
                    return null !== this.weekNumberWidth ? 'style="width:' + this.weekNumberWidth + 'px"' : ""
                }, hasRigidRows: function () {
                    var t = this.opt("eventLimit");
                    return t && "number" != typeof t
                }, updateSize: function (t, e, n) {
                    var s, o, a = this.opt("eventLimit"), l = this.dayGrid.headContainerEl.find(".fc-row");
                    if (!this.dayGrid.rowEls) return void (e || (s = this.computeScrollerHeight(t), this.scroller.setHeight(s)));
                    Ae.prototype.updateSize.apply(this, arguments), this.dayGrid.colWeekNumbersVisible && (this.weekNumberWidth = u(this.el.find(".fc-week-number"))), this.scroller.clear(), r(l), this.dayGrid.removeSegPopover(), a && "number" == typeof a && this.dayGrid.limitRows(a), s = this.computeScrollerHeight(t), this.setGridHeight(s, e), a && "number" != typeof a && this.dayGrid.limitRows(a), e || (this.scroller.setHeight(s), o = this.scroller.getScrollbarWidths(), (o.left || o.right) && (i(l, o), s = this.computeScrollerHeight(t), this.scroller.setHeight(s)), this.scroller.lockOverflow(o))
                }, computeScrollerHeight: function (t) {
                    return t - c(this.el, this.scroller.el)
                }, setGridHeight: function (t, e) {
                    e ? l(this.dayGrid.rowEls) : a(this.dayGrid.rowEls, t, !0)
                }, computeInitialDateScroll: function () {
                    return {top: 0}
                }, queryDateScroll: function () {
                    return {top: this.scroller.getScrollTop()}
                }, applyDateScroll: function (t) {
                    void 0 !== t.top && this.scroller.setScrollTop(t.top)
                }
            }), bn = {
                colWeekNumbersVisible: !1, renderHeadIntroHtml: function () {
                    var t = this.view;
                    return this.colWeekNumbersVisible ? '<th class="fc-week-number ' + t.calendar.theme.getClass("widgetHeader") + '" ' + t.weekNumberStyleAttr() + "><span>" + et(this.opt("weekNumberTitle")) + "</span></th>" : ""
                }, renderNumberIntroHtml: function (t) {
                    var e = this.view, n = this.getCellDate(t, 0);
                    return this.colWeekNumbersVisible ? '<td class="fc-week-number" ' + e.weekNumberStyleAttr() + ">" + e.buildGotoAnchorHtml({
                        date: n,
                        type: "week",
                        forceOff: 1 === this.colCnt
                    }, n.format("w")) + "</td>" : ""
                }, renderBgIntroHtml: function () {
                    var t = this.view;
                    return this.colWeekNumbersVisible ? '<td class="fc-week-number ' + t.calendar.theme.getClass("widgetContent") + '" ' + t.weekNumberStyleAttr() + "></td>" : ""
                }, renderIntroHtml: function () {
                    var t = this.view
                    ;
                    return this.colWeekNumbersVisible ? '<td class="fc-week-number" ' + t.weekNumberStyleAttr() + "></td>" : ""
                }, getIsNumbersVisible: function () {
                    return wn.prototype.getIsNumbersVisible.apply(this, arguments) || this.colWeekNumbersVisible
                }
            }, En = Wt.MonthView = Dn.extend({
                buildRenderRange: function (t, e, n) {
                    var i, r = Dn.prototype.buildRenderRange.apply(this, arguments),
                        s = this.calendar.msToUtcMoment(r.startMs, n), o = this.calendar.msToUtcMoment(r.endMs, n);
                    return this.isFixedWeeks() && (i = Math.ceil(o.diff(s, "weeks", !0)), o.add(6 - i, "weeks")), new Ue(s, o)
                }, setGridHeight: function (t, e) {
                    e && (t *= this.rowCnt / 6), a(this.dayGrid.rowEls, t, !e)
                }, isFixedWeeks: function () {
                    return this.opt("fixedWeekCount")
                }, isDateInOtherMonth: function (t, n) {
                    return t.month() !== e.utc(n.currentUnzonedRange.startMs).month()
                }
            });
            _t.basic = {class: Dn}, _t.basicDay = {type: "basic", duration: {days: 1}}, _t.basicWeek = {
                type: "basic",
                duration: {weeks: 1}
            }, _t.month = {class: En, duration: {months: 1}, defaults: {fixedWeekCount: !0}};
            var Sn = xe.extend({
                attachSegEls: function (t, e) {
                    var n, i = this.component;
                    return "bgEvent" === t ? n = i.bgContainerEls : "businessHours" === t ? n = i.businessContainerEls : "highlight" === t && (n = i.highlightContainerEls), i.updateSegVerticals(e), i.attachSegsByCol(i.groupSegsByCol(e), n), e.map(function (t) {
                        return t.el[0]
                    })
                }
            }), Cn = He.extend({
                timeGrid: null, constructor: function (t) {
                    He.apply(this, arguments), this.timeGrid = t
                }, renderFgSegs: function (t) {
                    this.renderFgSegsIntoContainers(t, this.timeGrid.fgContainerEls)
                }, renderFgSegsIntoContainers: function (t, e) {
                    var n, i;
                    for (n = this.timeGrid.groupSegsByCol(t), i = 0; i < this.timeGrid.colCnt; i++) this.updateFgSegCoords(n[i]);
                    this.timeGrid.attachSegsByCol(n, e)
                }, unrenderFgSegs: function () {
                    this.fgSegs && this.fgSegs.forEach(function (t) {
                        t.el.remove()
                    })
                }, computeEventTimeFormat: function () {
                    return this.opt("noMeridiemTimeFormat")
                }, computeDisplayEventEnd: function () {
                    return !0
                }, fgSegHtml: function (t, e) {
                    var n, i, r, s = this.view, o = s.calendar, a = t.footprint.componentFootprint, l = a.isAllDay,
                        u = t.footprint.eventDef, c = s.isEventDefDraggable(u),
                        h = !e && t.isStart && s.isEventDefResizableFromStart(u),
                        d = !e && t.isEnd && s.isEventDefResizableFromEnd(u), f = this.getSegClasses(t, c, h || d),
                        g = it(this.getSkinCss(u));
                    if (f.unshift("fc-time-grid-event", "fc-v-event"), s.isMultiDayRange(a.unzonedRange)) {
                        if (t.isStart || t.isEnd) {
                            var p = o.msToMoment(t.startMs), v = o.msToMoment(t.endMs);
                            n = this._getTimeText(p, v, l), i = this._getTimeText(p, v, l, "LT"), r = this._getTimeText(p, v, l, null, !1)
                        }
                    } else n = this.getTimeText(t.footprint), i = this.getTimeText(t.footprint, "LT"), r = this.getTimeText(t.footprint, null, !1);
                    return '<a class="' + f.join(" ") + '"' + (u.url ? ' href="' + et(u.url) + '"' : "") + (g ? ' style="' + g + '"' : "") + '><div class="fc-content">' + (n ? '<div class="fc-time" data-start="' + et(r) + '" data-full="' + et(i) + '"><span>' + et(n) + "</span></div>" : "") + (u.title ? '<div class="fc-title">' + et(u.title) + "</div>" : "") + '</div><div class="fc-bg"/>' + (d ? '<div class="fc-resizer fc-end-resizer" />' : "") + "</a>"
                }, updateFgSegCoords: function (t) {
                    this.timeGrid.computeSegVerticals(t), this.computeFgSegHorizontals(t), this.timeGrid.assignSegVerticals(t), this.assignFgSegHorizontals(t)
                }, computeFgSegHorizontals: function (t) {
                    var e, n, i;
                    if (this.sortEventSegs(t), e = Lt(t), Ot(e), n = e[0]) {
                        for (i = 0; i < n.length; i++) Nt(n[i]);
                        for (i = 0; i < n.length; i++) this.computeFgSegForwardBack(n[i], 0, 0)
                    }
                }, computeFgSegForwardBack: function (t, e, n) {
                    var i, r = t.forwardSegs;
                    if (void 0 === t.forwardCoord) for (r.length ? (this.sortForwardSegs(r), this.computeFgSegForwardBack(r[0], e + 1, n), t.forwardCoord = r[0].backwardCoord) : t.forwardCoord = 1, t.backwardCoord = t.forwardCoord - (t.forwardCoord - n) / (e + 1), i = 0; i < r.length; i++) this.computeFgSegForwardBack(r[i], 0, t.forwardCoord)
                }, sortForwardSegs: function (t) {
                    t.sort(lt(this, "compareForwardSegs"))
                }, compareForwardSegs: function (t, e) {
                    return e.forwardPressure - t.forwardPressure || (t.backwardCoord || 0) - (e.backwardCoord || 0) || this.compareEventSegs(t, e)
                }, assignFgSegHorizontals: function (t) {
                    var e, n;
                    for (e = 0; e < t.length; e++) n = t[e], n.el.css(this.generateFgSegHorizontalCss(n)), n.bottom - n.top < 30 && n.el.addClass("fc-short")
                }, generateFgSegHorizontalCss: function (t) {
                    var e, n, i = this.opt("slotEventOverlap"), r = t.backwardCoord, s = t.forwardCoord,
                        o = this.timeGrid.generateSegVerticalCss(t);
                    return i && (s = Math.min(1, r + 2 * (s - r))), this.timeGrid.isRTL ? (e = 1 - s, n = r) : (e = r, n = 1 - s), o.zIndex = t.level + 1, o.left = 100 * e + "%", o.right = 100 * n + "%", i && t.forwardPressure && (o[this.isRTL ? "marginLeft" : "marginRight"] = 20), o
                }
            }), Rn = Pe.extend({
                renderSegs: function (e, n) {
                    var i, r, s, o = [];
                    for (this.eventRenderer.renderFgSegsIntoContainers(e, this.component.helperContainerEls), i = 0; i < e.length; i++) r = e[i], n && n.col === r.col && (s = n.el, r.el.css({
                        left: s.css("left"),
                        right: s.css("right"),
                        "margin-left": s.css("margin-left"),
                        "margin-right": s.css("margin-right")
                    })), o.push(r.el[0]);
                    return t(o)
                }
            }), Tn = Wt.TimeGrid = ke.extend(Ie, Be, {
                eventRendererClass: Cn,
                businessHourRendererClass: Me,
                helperRendererClass: Rn,
                fillRendererClass: Sn,
                view: null,
                helperRenderer: null,
                dayRanges: null,
                slotDuration: null,
                snapDuration: null,
                snapsPerSlot: null,
                labelFormat: null,
                labelInterval: null,
                headContainerEl: null,
                colEls: null,
                slatContainerEl: null,
                slatEls: null,
                nowIndicatorEls: null,
                colCoordCache: null,
                slatCoordCache: null,
                bottomRuleEl: null,
                colContainerEls: null,
                fgContainerEls: null,
                bgContainerEls: null,
                helperContainerEls: null,
                highlightContainerEls: null,
                businessContainerEls: null,
                helperSegs: null,
                highlightSegs: null,
                businessSegs: null,
                constructor: function (t) {
                    this.view = t, ke.call(this), this.processOptions()
                },
                componentFootprintToSegs: function (t) {
                    var e, n = this.sliceRangeByTimes(t.unzonedRange);
                    for (e = 0; e < n.length; e++) this.isRTL ? n[e].col = this.daysPerRow - 1 - n[e].dayIndex : n[e].col = n[e].dayIndex;
                    return n
                },
                sliceRangeByTimes: function (t) {
                    var e, n, i = [];
                    for (n = 0; n < this.daysPerRow; n++) (e = t.intersect(this.dayRanges[n])) && i.push({
                        startMs: e.startMs,
                        endMs: e.endMs,
                        isStart: e.isStart,
                        isEnd: e.isEnd,
                        dayIndex: n
                    });
                    return i
                },
                processOptions: function () {
                    var n, i = this.opt("slotDuration"), r = this.opt("snapDuration");
                    i = e.duration(i), r = r ? e.duration(r) : i, this.slotDuration = i, this.snapDuration = r, this.snapsPerSlot = i / r, n = this.opt("slotLabelFormat"), t.isArray(n) && (n = n[n.length - 1]), this.labelFormat = n || this.opt("smallTimeFormat"), n = this.opt("slotLabelInterval"), this.labelInterval = n ? e.duration(n) : this.computeLabelInterval(i)
                },
                computeLabelInterval: function (t) {
                    var n, i, r;
                    for (n = Pn.length - 1; n >= 0; n--) if (i = e.duration(Pn[n]), r = U(i, t), at(r) && r > 1) return i;
                    return e.duration(t)
                },
                renderDates: function (t) {
                    this.dateProfile = t, this.updateDayTable(), this.renderSlats(), this.renderColumns()
                },
                renderSkeleton: function () {
                    var t = this.view.calendar.theme;
                    this.el.html('<div class="fc-bg"></div><div class="fc-slats"></div><hr class="fc-divider ' + t.getClass("widgetHeader") + '" style="display:none" />'), this.bottomRuleEl = this.el.find("hr")
                },
                renderSlats: function () {
                    var t = this.view.calendar.theme;
                    this.slatContainerEl = this.el.find("> .fc-slats").html('<table class="' + t.getClass("tableGrid") + '">' + this.renderSlatRowHtml() + "</table>"), this.slatEls = this.slatContainerEl.find("tr"), this.slatCoordCache = new ge({
                        els: this.slatEls,
                        isVertical: !0
                    })
                },
                renderSlatRowHtml: function () {
                    for (var t, n, i, r = this.view, s = r.calendar, o = s.theme, a = this.isRTL, l = this.dateProfile, u = "", c = e.duration(+l.minTime), h = e.duration(0); c < l.maxTime;) t = s.msToUtcMoment(l.renderUnzonedRange.startMs).time(c), n = at(U(h, this.labelInterval)), i = '<td class="fc-axis fc-time ' + o.getClass("widgetContent") + '" ' + r.axisStyleAttr() + ">" + (n ? "<span>" + et(t.format(this.labelFormat)) + "</span>" : "") + "</td>", u += '<tr data-time="' + t.format("HH:mm:ss") + '"' + (n ? "" : ' class="fc-minor"') + ">" + (a ? "" : i) + '<td class="' + o.getClass("widgetContent") + '"/>' + (a ? i : "") + "</tr>", c.add(this.slotDuration), h.add(this.slotDuration);
                    return u
                },
                renderColumns: function () {
                    var t = this.dateProfile, e = this.view.calendar.theme;
                    this.dayRanges = this.dayDates.map(function (e) {
                        return new Ue(e.clone().add(t.minTime), e.clone().add(t.maxTime))
                    }), this.headContainerEl && this.headContainerEl.html(this.renderHeadHtml()), this.el.find("> .fc-bg").html('<table class="' + e.getClass("tableGrid") + '">' + this.renderBgTrHtml(0) + "</table>"), this.colEls = this.el.find(".fc-day, .fc-disabled-day"), this.colCoordCache = new ge({
                        els: this.colEls,
                        isHorizontal: !0
                    }), this.renderContentSkeleton()
                },
                renderContentSkeleton: function () {
                    var e, n, i = "";
                    for (e = 0; e < this.colCnt; e++) i += '<td><div class="fc-content-col"><div class="fc-event-container fc-helper-container"></div><div class="fc-event-container"></div><div class="fc-highlight-container"></div><div class="fc-bgevent-container"></div><div class="fc-business-container"></div></div></td>';
                    n = t('<div class="fc-content-skeleton"><table><tr>' + i + "</tr></table></div>"), this.colContainerEls = n.find(".fc-content-col"), this.helperContainerEls = n.find(".fc-helper-container"), this.fgContainerEls = n.find(".fc-event-container:not(.fc-helper-container)"), this.bgContainerEls = n.find(".fc-bgevent-container"), this.highlightContainerEls = n.find(".fc-highlight-container"), this.businessContainerEls = n.find(".fc-business-container"), this.bookendCells(n.find("tr")), this.el.append(n)
                },
                groupSegsByCol: function (t) {
                    var e, n = [];
                    for (e = 0; e < this.colCnt; e++) n.push([]);
                    for (e = 0; e < t.length; e++) n[t[e].col].push(t[e]);
                    return n
                },
                attachSegsByCol: function (t, e) {
                    var n, i, r;
                    for (n = 0; n < this.colCnt; n++) for (i = t[n], r = 0; r < i.length; r++) e.eq(n).append(i[r].el)
                },
                getNowIndicatorUnit: function () {
                    return "minute"
                },
                renderNowIndicator: function (e) {
                    var n, i = this.componentFootprintToSegs(new We(new Ue(e, e.valueOf() + 1), !1)),
                        r = this.computeDateTop(e, e), s = [];
                    for (n = 0; n < i.length; n++) s.push(t('<div class="fc-now-indicator fc-now-indicator-line"></div>').css("top", r).appendTo(this.colContainerEls.eq(i[n].col))[0]);
                    i.length > 0 && s.push(t('<div class="fc-now-indicator fc-now-indicator-arrow"></div>').css("top", r).appendTo(this.el.find(".fc-content-skeleton"))[0]), this.nowIndicatorEls = t(s)
                },
                unrenderNowIndicator: function () {
                    this.nowIndicatorEls && (this.nowIndicatorEls.remove(), this.nowIndicatorEls = null)
                },
                updateSize: function (t, e, n) {
                    ke.prototype.updateSize.apply(this, arguments), this.slatCoordCache.build(), n && this.updateSegVerticals([].concat(this.eventRenderer.getSegs(), this.businessSegs || []))
                },
                getTotalSlatHeight: function () {
                    return this.slatContainerEl.outerHeight()
                },
                computeDateTop: function (t, n) {
                    return this.computeTimeTop(e.duration(t - n.clone().stripTime()))
                },
                computeTimeTop: function (t) {
                    var e, n, i = this.slatEls.length, r = this.dateProfile, s = (t - r.minTime) / this.slotDuration;
                    return s = Math.max(0, s), s = Math.min(i, s), e = Math.floor(s), e = Math.min(e, i - 1), n = s - e, this.slatCoordCache.getTopPosition(e) + this.slatCoordCache.getHeight(e) * n
                },
                updateSegVerticals: function (t) {
                    this.computeSegVerticals(t), this.assignSegVerticals(t)
                },
                computeSegVerticals: function (t) {
                    var e, n, i, r = this.opt("agendaEventMinHeight");
                    for (e = 0; e < t.length; e++) n = t[e], i = this.dayDates[n.dayIndex], n.top = this.computeDateTop(n.startMs, i), n.bottom = Math.max(n.top + r, this.computeDateTop(n.endMs, i))
                },
                assignSegVerticals: function (t) {
                    var e, n;
                    for (e = 0; e < t.length; e++) n = t[e], n.el.css(this.generateSegVerticalCss(n))
                },
                generateSegVerticalCss: function (t) {
                    return {top: t.top, bottom: -t.bottom}
                },
                prepareHits: function () {
                    this.colCoordCache.build(), this.slatCoordCache.build()
                },
                releaseHits: function () {
                    this.colCoordCache.clear()
                },
                queryHit: function (t, e) {
                    var n = this.snapsPerSlot, i = this.colCoordCache, r = this.slatCoordCache;
                    if (i.isLeftInBounds(t) && r.isTopInBounds(e)) {
                        var s = i.getHorizontalIndex(t), o = r.getVerticalIndex(e);
                        if (null != s && null != o) {
                            var a = r.getTopOffset(o), l = r.getHeight(o), u = (e - a) / l, c = Math.floor(u * n),
                                h = o * n + c, d = a + c / n * l, f = a + (c + 1) / n * l;
                            return {
                                col: s,
                                snap: h,
                                component: this,
                                left: i.getLeftOffset(s),
                                right: i.getRightOffset(s),
                                top: d,
                                bottom: f
                            }
                        }
                    }
                },
                getHitFootprint: function (t) {
                    var e, n = this.getCellDate(0, t.col), i = this.computeSnapTime(t.snap);
                    return n.time(i), e = n.clone().add(this.snapDuration), new We(new Ue(n, e), !1)
                },
                computeSnapTime: function (t) {
                    return e.duration(this.dateProfile.minTime + this.snapDuration * t)
                },
                getHitEl: function (t) {
                    return this.colEls.eq(t.col)
                },
                renderDrag: function (t, e, n) {
                    var i;
                    if (e) {
                        if (t.length) return this.helperRenderer.renderEventDraggingFootprints(t, e, n), !0
                    } else for (i = 0; i < t.length; i++) this.renderHighlight(t[i].componentFootprint)
                },
                unrenderDrag: function (t) {
                    this.unrenderHighlight(), this.helperRenderer.unrender()
                },
                renderEventResize: function (t, e, n) {
                    this.helperRenderer.renderEventResizingFootprints(t, e, n)
                },
                unrenderEventResize: function (t) {
                    this.helperRenderer.unrender()
                },
                renderSelectionFootprint: function (t) {
                    this.opt("selectHelper") ? this.helperRenderer.renderComponentFootprint(t) : this.renderHighlight(t)
                },
                unrenderSelection: function () {
                    this.helperRenderer.unrender(), this.unrenderHighlight()
                }
            }), In = Wt.AgendaView = Ae.extend({
                scroller: null,
                timeGridClass: Tn,
                timeGrid: null,
                dayGridClass: wn,
                dayGrid: null,
                axisWidth: null,
                usesMinMaxTime: !0,
                constructor: function () {
                    Ae.apply(this, arguments), this.timeGrid = this.instantiateTimeGrid(), this.addChild(this.timeGrid), this.opt("allDaySlot") && (this.dayGrid = this.instantiateDayGrid(), this.addChild(this.dayGrid)), this.scroller = new we({
                        overflowX: "hidden",
                        overflowY: "auto"
                    })
                },
                instantiateTimeGrid: function () {
                    return new (this.timeGridClass.extend(Hn))(this)
                },
                instantiateDayGrid: function () {
                    return new (this.dayGridClass.extend(Mn))(this)
                },
                renderSkeleton: function () {
                    var e, n;
                    this.el.addClass("fc-agenda-view").html(this.renderSkeletonHtml()), this.scroller.render(), e = this.scroller.el.addClass("fc-time-grid-container"), n = t('<div class="fc-time-grid" />').appendTo(e), this.el.find(".fc-body > tr > td").append(e), this.timeGrid.headContainerEl = this.el.find(".fc-head-container"), this.timeGrid.setElement(n), this.dayGrid && (this.dayGrid.setElement(this.el.find(".fc-day-grid")), this.dayGrid.bottomCoordPadding = this.dayGrid.el.next("hr").outerHeight())
                },
                unrenderSkeleton: function () {
                    this.timeGrid.removeElement(), this.dayGrid && this.dayGrid.removeElement(), this.scroller.destroy()
                },
                renderSkeletonHtml: function () {
                    var t = this.calendar.theme;
                    return '<table class="' + t.getClass("tableGrid") + '">' + (this.opt("columnHeader") ? '<thead class="fc-head"><tr><td class="fc-head-container ' + t.getClass("widgetHeader") + '">&nbsp;</td></tr></thead>' : "") + '<tbody class="fc-body"><tr><td class="' + t.getClass("widgetContent") + '">' + (this.dayGrid ? '<div class="fc-day-grid"/><hr class="fc-divider ' + t.getClass("widgetHeader") + '"/>' : "") + "</td></tr></tbody></table>"
                },
                axisStyleAttr: function () {
                    return null !== this.axisWidth ? 'style="width:' + this.axisWidth + 'px"' : ""
                },
                getNowIndicatorUnit: function () {
                    return this.timeGrid.getNowIndicatorUnit()
                },
                updateSize: function (t, e, n) {
                    var s, o, a;
                    if (Ae.prototype.updateSize.apply(this, arguments), this.axisWidth = u(this.el.find(".fc-axis")), !this.timeGrid.colEls) return void (e || (o = this.computeScrollerHeight(t), this.scroller.setHeight(o)));
                    var l = this.el.find(".fc-row:not(.fc-scroller *)");
                    this.timeGrid.bottomRuleEl.hide(), this.scroller.clear(), r(l), this.dayGrid && (this.dayGrid.removeSegPopover(), s = this.opt("eventLimit"), s && "number" != typeof s && (s = xn), s && this.dayGrid.limitRows(s)), e || (o = this.computeScrollerHeight(t), this.scroller.setHeight(o), a = this.scroller.getScrollbarWidths(), (a.left || a.right) && (i(l, a), o = this.computeScrollerHeight(t), this.scroller.setHeight(o)), this.scroller.lockOverflow(a), this.timeGrid.getTotalSlatHeight() < o && this.timeGrid.bottomRuleEl.show())
                },
                computeScrollerHeight: function (t) {
                    return t - c(this.el, this.scroller.el)
                },
                computeInitialDateScroll: function () {
                    var t = e.duration(this.opt("scrollTime")), n = this.timeGrid.computeTimeTop(t);
                    return n = Math.ceil(n), n && n++, {top: n}
                },
                queryDateScroll: function () {
                    return {top: this.scroller.getScrollTop()}
                },
                applyDateScroll: function (t) {
                    void 0 !== t.top && this.scroller.setScrollTop(t.top)
                },
                getHitFootprint: function (t) {
                    return t.component.getHitFootprint(t)
                },
                getHitEl: function (t) {
                    return t.component.getHitEl(t)
                },
                executeEventRender: function (t) {
                    var e, n, i = {}, r = {};
                    for (e in t) n = t[e], n.getEventDef().isAllDay() ? i[e] = n : r[e] = n;
                    this.timeGrid.executeEventRender(r), this.dayGrid && this.dayGrid.executeEventRender(i)
                },
                renderDrag: function (t, e, n) {
                    var i = Ut(t), r = !1;
                    return r = this.timeGrid.renderDrag(i.timed, e, n), this.dayGrid && (r = this.dayGrid.renderDrag(i.allDay, e, n) || r), r
                },
                renderEventResize: function (t, e, n) {
                    var i = Ut(t);
                    this.timeGrid.renderEventResize(i.timed, e, n), this.dayGrid && this.dayGrid.renderEventResize(i.allDay, e, n)
                },
                renderSelectionFootprint: function (t) {
                    t.isAllDay ? this.dayGrid && this.dayGrid.renderSelectionFootprint(t) : this.timeGrid.renderSelectionFootprint(t)
                }
            }), Hn = {
                renderHeadIntroHtml: function () {
                    var t, e = this.view, n = e.calendar,
                        i = n.msToUtcMoment(this.dateProfile.renderUnzonedRange.startMs, !0);
                    return this.opt("weekNumbers") ? (t = i.format(this.opt("smallWeekFormat")), '<th class="fc-axis fc-week-number ' + n.theme.getClass("widgetHeader") + '" ' + e.axisStyleAttr() + ">" + e.buildGotoAnchorHtml({
                        date: i,
                        type: "week",
                        forceOff: this.colCnt > 1
                    }, et(t)) + "</th>") : '<th class="fc-axis ' + n.theme.getClass("widgetHeader") + '" ' + e.axisStyleAttr() + "></th>"
                }, renderBgIntroHtml: function () {
                    var t = this.view;
                    return '<td class="fc-axis ' + t.calendar.theme.getClass("widgetContent") + '" ' + t.axisStyleAttr() + "></td>"
                }, renderIntroHtml: function () {
                    return '<td class="fc-axis" ' + this.view.axisStyleAttr() + "></td>"
                }
            }, Mn = {
                renderBgIntroHtml: function () {
                    var t = this.view;
                    return '<td class="fc-axis ' + t.calendar.theme.getClass("widgetContent") + '" ' + t.axisStyleAttr() + "><span>" + t.getAllDayHtml() + "</span></td>"
                }, renderIntroHtml: function () {
                    return '<td class="fc-axis" ' + this.view.axisStyleAttr() + "></td>"
                }
            }, xn = 5, Pn = [{hours: 1}, {minutes: 30}, {minutes: 15}, {seconds: 30}, {seconds: 15}];
            _t.agenda = {
                class: In,
                defaults: {allDaySlot: !0, slotDuration: "00:30:00", slotEventOverlap: !0}
            }, _t.agendaDay = {type: "agenda", duration: {days: 1}}, _t.agendaWeek = {
                type: "agenda",
                duration: {weeks: 1}
            };
            var zn = Wt.ListView = Ae.extend({
                segSelector: ".fc-list-item",
                scroller: null,
                contentEl: null,
                dayDates: null,
                dayRanges: null,
                constructor: function () {
                    Ae.apply(this, arguments), this.scroller = new we({overflowX: "hidden", overflowY: "auto"})
                },
                renderSkeleton: function () {
                    this.el.addClass("fc-list-view " + this.calendar.theme.getClass("listView")), this.scroller.render(), this.scroller.el.appendTo(this.el), this.contentEl = this.scroller.scrollEl
                },
                unrenderSkeleton: function () {
                    this.scroller.destroy()
                },
                updateSize: function (t, e, n) {
                    this.scroller.setHeight(this.computeScrollerHeight(t))
                },
                computeScrollerHeight: function (t) {
                    return t - c(this.el, this.scroller.el)
                },
                renderDates: function (t) {
                    for (var e = this.calendar, n = e.msToUtcMoment(t.renderUnzonedRange.startMs, !0), i = e.msToUtcMoment(t.renderUnzonedRange.endMs, !0), r = [], s = []; n < i;) r.push(n.clone()), s.push(new Ue(n, n.clone().add(1, "day"))), n.add(1, "day");
                    this.dayDates = r, this.dayRanges = s
                },
                componentFootprintToSegs: function (t) {
                    var e, n, i, r = this.dayRanges, s = [];
                    for (e = 0; e < r.length; e++) if ((n = t.unzonedRange.intersect(r[e])) && (i = {
                        startMs: n.startMs,
                        endMs: n.endMs,
                        isStart: n.isStart,
                        isEnd: n.isEnd,
                        dayIndex: e
                    }, s.push(i), !i.isEnd && !t.isAllDay && e + 1 < r.length && t.unzonedRange.endMs < r[e + 1].startMs + this.nextDayThreshold)) {
                        i.endMs = t.unzonedRange.endMs, i.isEnd = !0;
                        break
                    }
                    return s
                },
                eventRendererClass: He.extend({
                    renderFgSegs: function (t) {
                        t.length ? this.component.renderSegList(t) : this.component.renderEmptyMessage()
                    }, fgSegHtml: function (t) {
                        var e, n = this.view, i = n.calendar, r = i.theme, s = t.footprint, o = s.eventDef,
                            a = s.componentFootprint, l = o.url, u = ["fc-list-item"].concat(this.getClasses(o)),
                            c = this.getBgColor(o);
                        return e = a.isAllDay ? n.getAllDayHtml() : n.isMultiDayRange(a.unzonedRange) ? t.isStart || t.isEnd ? et(this._getTimeText(i.msToMoment(t.startMs), i.msToMoment(t.endMs), a.isAllDay)) : n.getAllDayHtml() : et(this.getTimeText(s)), l && u.push("fc-has-url"), '<tr class="' + u.join(" ") + '">' + (this.displayEventTime ? '<td class="fc-list-item-time ' + r.getClass("widgetContent") + '">' + (e || "") + "</td>" : "") + '<td class="fc-list-item-marker ' + r.getClass("widgetContent") + '"><span class="fc-event-dot"' + (c ? ' style="background-color:' + c + '"' : "") + '></span></td><td class="fc-list-item-title ' + r.getClass("widgetContent") + '"><a' + (l ? ' href="' + et(l) + '"' : "") + ">" + et(o.title || "") + "</a></td></tr>"
                    }, computeEventTimeFormat: function () {
                        return this.opt("mediumTimeFormat")
                    }
                }),
                eventPointingClass: Te.extend({
                    handleClick: function (e, n) {
                        var i;
                        Te.prototype.handleClick.apply(this, arguments), t(n.target).closest("a[href]").length || (i = e.footprint.eventDef.url) && !n.isDefaultPrevented() && (window.location.href = i)
                    }
                }),
                renderEmptyMessage: function () {
                    this.contentEl.html('<div class="fc-list-empty-wrap2"><div class="fc-list-empty-wrap1"><div class="fc-list-empty">' + et(this.opt("noEventsMessage")) + "</div></div></div>")
                },
                renderSegList: function (e) {
                    var n, i, r, s = this.groupSegsByDay(e),
                        o = t('<table class="fc-list-table ' + this.calendar.theme.getClass("tableList") + '"><tbody/></table>'),
                        a = o.find("tbody");
                    for (n = 0; n < s.length; n++) if (i = s[n]) for (a.append(this.dayHeaderHtml(this.dayDates[n])), this.eventRenderer.sortEventSegs(i), r = 0; r < i.length; r++) a.append(i[r].el);
                    this.contentEl.empty().append(o)
                },
                groupSegsByDay: function (t) {
                    var e, n, i = [];
                    for (e = 0; e < t.length; e++) n = t[e], (i[n.dayIndex] || (i[n.dayIndex] = [])).push(n);
                    return i
                },
                dayHeaderHtml: function (t) {
                    var e = this.opt("listDayFormat"), n = this.opt("listDayAltFormat");
                    return '<tr class="fc-list-heading" data-date="' + t.format("YYYY-MM-DD") + '"><td class="' + this.calendar.theme.getClass("widgetHeader") + '" colspan="3">' + (e ? this.buildGotoAnchorHtml(t, {class: "fc-list-heading-main"}, et(t.format(e))) : "") + (n ? this.buildGotoAnchorHtml(t, {class: "fc-list-heading-alt"}, et(t.format(n))) : "") + "</td></tr>"
                }
            });
            return _t.list = {
                class: zn,
                buttonTextKey: "list",
                defaults: {buttonText: "list", listDayFormat: "LL", noEventsMessage: "No events to display"}
            }, _t.listDay = {
                type: "list",
                duration: {days: 1},
                defaults: {listDayFormat: "dddd"}
            }, _t.listWeek = {
                type: "list",
                duration: {weeks: 1},
                defaults: {listDayFormat: "dddd", listDayAltFormat: "LL"}
            }, _t.listMonth = {
                type: "list",
                duration: {month: 1},
                defaults: {listDayAltFormat: "dddd"}
            }, _t.listYear = {type: "list", duration: {year: 1}, defaults: {listDayAltFormat: "dddd"}}, Wt
        });
    })(jQuery);
    layui.link(basePath + '../../lib/layui/lay/modules/fullcalendar/fullcalendar.css');
    exports('fullcalendar', null);
});