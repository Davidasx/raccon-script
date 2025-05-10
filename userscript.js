// ==UserScript==
// @name         CardRecordPROMAX
// @namespace    http://tampermonkey.net/
// @version      1.2.0
// @description  not an AD reference
// @author       Several People
// @match        *://ruarua.ru/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        unsafeWindow
// ==/UserScript==

(function () {
    'use strict'

    // 配置项： 'angelslime' | 'none' | 'random'
    const animationType = GM_getValue('animationType', 'angelslime');
    const angelslime = 'https://ruarua.ru/api/pic/gif/loading1.webp';

    function replaceSrc(src) {
        if (!src) return src;
        if (src.endsWith('angelslime.webp') || src.endsWith('loading2.webp') || src.endsWith('loading3.webp')) {
            if (animationType === 'angelslime') {
                return angelslime;
            } else if (animationType === 'none') {
                return '';
            } else if (animationType === 'random') {
                return src;
            }
        }
        return src;
    }

    // 重写 HTMLImageElement.prototype.src
    const imgProto = HTMLImageElement.prototype;
    const originalSrcDesc = Object.getOwnPropertyDescriptor(imgProto, 'src');
    Object.defineProperty(imgProto, 'src', {
        get: originalSrcDesc.get,
        set: function (newSrc) {
            const fixed = replaceSrc(newSrc);
            if (fixed === '') {
                this.remove();
            } else {
                originalSrcDesc.set.call(this, fixed);
            }
        }
    });

    // 重写 Element.prototype.setAttribute 拦截 setAttribute('src', ...)
    const elemProto = Element.prototype;
    const originalSetAttr = elemProto.setAttribute;
    elemProto.setAttribute = function (name, value) {
        if (this.tagName === 'IMG' && name.toLowerCase() === 'src') {
            const fixed = replaceSrc(value);
            if (fixed === '') {
                this.remove();
                return;
            } else {
                value = fixed;
            }
        }
        return originalSetAttr.call(this, name, value);
    };

    // DOMContentLoaded 后修正已有 <img>
    window.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('img').forEach(img => {
            const fixed = replaceSrc(img.getAttribute('src'));
            if (fixed !== img.getAttribute('src')) {
                if (fixed === '') {
                    img.remove();
                } else {
                    img.setAttribute('src', fixed);
                }
            }
        });
    });

    function ATKprint(num) {
        return Math.floor(num) + "." + (Math.floor((num - Math.floor(num)) * 10))
    }

    function loadCaptcha() { var w = unsafeWindow, C = '___grecaptcha_cfg', cfg = w[C] = w[C] || {}, N = 'grecaptcha'; var gr = w[N] = w[N] || {}; gr.ready = gr.ready || function (f) { (cfg['fns'] = cfg['fns'] || []).push(f); }; w['__recaptcha_api'] = 'https://recaptcha.net/recaptcha/api2/'; (cfg['render'] = cfg['render'] || []).push('6LdeDqopAAAAAFhBk3q_TY7uB4QjU1QJ26viqZzm'); (cfg['clr'] = cfg['clr'] || []).push('true'); w['__google_recaptcha_client'] = true; var d = document, po = d.createElement('script'); po.type = 'text/javascript'; po.async = true; po.charset = 'utf-8'; var v = w.navigator, m = d.createElement('meta'); m.httpEquiv = 'origin-trial'; m.content = 'A6iYDRdcg1LVww9DNZEU+JUx2g1IJxSxk4P6F+LimR0ElFa38FydBqtz/AmsKdGr11ZooRgDPCInHJfGzwtR+A4AAACXeyJvcmlnaW4iOiJodHRwczovL3d3dy5yZWNhcHRjaGEubmV0OjQ0MyIsImZlYXR1cmUiOiJEaXNhYmxlVGhpcmRQYXJ0eVN0b3JhZ2VQYXJ0aXRpb25pbmczIiwiZXhwaXJ5IjoxNzU3OTgwODAwLCJpc1N1YmRvbWFpbiI6dHJ1ZSwiaXNUaGlyZFBhcnR5Ijp0cnVlfQ=='; if (v && v.cookieDeprecationLabel) { v.cookieDeprecationLabel.getValue().then(function (l) { if (l !== 'treatment_1.1' && l !== 'treatment_1.2' && l !== 'control_1.1') { d.head.prepend(m); } }); } else { d.head.prepend(m); } var m = d.createElement('meta'); m.httpEquiv = 'origin-trial'; m.content = '3NNj0GXVktLOmVKwWUDendk4Vq2qgMVDBDX+Sni48ATJl9JBj+zF+9W2HGB3pvt6qowOihTbQgTeBm9SKbdTwYAAABfeyJvcmlnaW4iOiJodHRwczovL3JlY2FwdGNoYS5uZXQ6NDQzIiwiZmVhdHVyZSI6IlRwY2QiLCJleHBpcnkiOjE3MzUzNDM5OTksImlzVGhpcmRQYXJ0eSI6dHJ1ZX0='; d.head.prepend(m); po.src = 'https://www.gstatic.com/recaptcha/releases/ItfkQiGBlJDHuTkOhlT3zHpB/recaptcha__zh_cn.js'; po.crossOrigin = 'anonymous'; po.integrity = 'sha384-UF8pAykZ+VBSDcjXDEt2VvikemnguufrcXs9KUn/cNlu5UOpsyb3P1RhkXBdRuLk'; var e = d.querySelector('script[nonce]'), n = e && (e['nonce'] || e.getAttribute('nonce')); if (n) { po.setAttribute('nonce', n); } var s = d.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s); };

    const auto_scroll = {
        _value: GM_getValue("auto_scroll", true),
        get value() {
            return this._value
        },
        set value(newVal) {
            this._value = newVal
            GM_setValue("auto_scroll", newVal)
        }
    }
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const bg = GM_getValue("bg_display", false)
    if (!bg) {
        document.getElementsByClassName("bgfull")[0].style = ""
    }
    if (document.cookie.match("nohorizon") === null) {
        document.cookie = "nohorizon=1; path=/; domain=ruarua.ru; expires=Mon, 01 Jan 2123 00:00:00 GMT";
    }
    function chatScroll() {
        if (document.getElementById("board").scrollTop !== document.getElementById("board").scrollHeight) {
            document.getElementById("board").scrollTop = document.getElementById("board").scrollHeight
        }
    }
    function chatScroll2() {
        if (document.getElementById("board").scrollTop !== document.getElementById("board").scrollHeight && auto_scroll.value === true) {
            chatScroll()
        }
    }
    setInterval(chatScroll2, 1000)
    async function betterButton() {
        if (unsafeWindow.location.pathname.startsWith("/e/mob") === true || unsafeWindow.location.pathname.startsWith("/mob") === true) {
            await delay(300)
            if (unsafeWindow.location.pathname.startsWith("/e/mob") === true || unsafeWindow.location.pathname.startsWith("/mob") === true) {
                for (let i = document.getElementsByClassName("btn btn-primary").length - 1; i >= 0; i--) {
                    document.getElementsByClassName("btn btn-primary")[i].className = "btn btn-primary numchange"
                }
            }
        }
    }
    setInterval(betterButton, 1000)
    function noAssistance() {
        if (document.getElementById("post-193") !== null && document.getElementById("post-193").innerHTML.includes("Novice assistance")) {
            document.getElementById("post-193").innerHTML = document.getElementById("post-193").innerHTML.replaceAll("Novice assistance", "")
            document.getElementById("post-193").innerHTML = document.getElementById("post-193").innerHTML.replaceAll("has been activated", "")
        }
    }
    setInterval(noAssistance, 1000)
    function replaceCountdown() {
        if (unsafeWindow.location.pathname.startsWith("/e/mob") === true || unsafeWindow.location.pathname.startsWith("/mob") === true) {
            if (document.querySelector('span[id^="countdown_mob"]') !== null) {
                document.querySelector('span[id^="countdown_mob"]').id = "betterCount"
            }
            if (document.getElementById("betterCount") !== null) {
                let despawnTime = parseInt(document.getElementById("post-193").innerHTML.match(/(?<=targetTimestamp\s=\s)\d+/)[0], 10)
                let currentTime = Math.floor(Date.now() / 1000)
                if (despawnTime > currentTime) {
                    document.getElementById("betterCount").style = "color: #3fff7f"
                    document.getElementById("betterCount").innerHTML = "" + (despawnTime - currentTime)
                } else {
                    document.getElementById("betterCount").style = "color: #ff3f7f"
                    document.getElementById("betterCount").innerHTML = "" + (currentTime - despawnTime)
                }
            }
        }
    }
    setInterval(replaceCountdown, 1000)
    const PFLFstart = {
        _value: GM_getValue("PFLFstart", false),
        get value() {
            return this._value
        },
        set value(newVal) {
            this._value = newVal
            GM_setValue("PFLFstart", newVal)
        }
    }
    const PFLFturn = {
        _value: GM_getValue("PFLFturn", 0),
        get value() {
            return this._value
        },
        set value(newVal) {
            this._value = newVal
            GM_setValue("PFLFturn", newVal)
        }
    }
    const PFLFscore = {
        _value: GM_getValue("PFLFscore", 0),
        get value() {
            return this._value
        },
        set value(newVal) {
            this._value = newVal
            GM_setValue("PFLFscore", newVal)
        }
    }
    const PFLFclear = {
        _value: GM_getValue("PFLFclear", 0),
        get value() {
            return this._value
        },
        set value(newVal) {
            this._value = newVal
            GM_setValue("PFLFclear", newVal)
        }
    }
    const PFLFdice = {
        _value: GM_getValue("PFLFdice", 0),
        get value() {
            return this._value
        },
        set value(newVal) {
            this._value = newVal
            GM_setValue("PFLFdice", newVal)
        }
    }
    const PFLFlimit = {
        _value: GM_getValue("PFLFlimit", 8),
        get value() {
            return this._value
        },
        set value(newVal) {
            this._value = newVal
            GM_setValue("PFLFlimit", newVal)
        }
    }
    const PFLFroll = {
        _value: GM_getValue("PFLFroll", 3),
        get value() {
            return this._value
        },
        set value(newVal) {
            this._value = newVal
            GM_setValue("PFLFroll", newVal)
        }
    }
    const Num1A2B = {
        _value: GM_getValue("Num1A2B", 0),
        get value() {
            return this._value
        },
        set value(newVal) {
            this._value = newVal
            GM_setValue("Num1A2B", newVal)
        }
    }
    const com_rep = {
        _value: GM_getValue("com_rep", false),
        get value() {
            return this._value
        },
        set value(newVal) {
            this._value = newVal
            GM_setValue("com_rep", newVal)
        }
    }
    const com_dil = {
        _value: GM_getValue("com_dil", false),
        get value() {
            return this._value
        },
        set value(newVal) {
            this._value = newVal
            GM_setValue("com_dil", newVal)
        }
    }
    const msg_send = {
        _value: GM_getValue("msg_send", true),
        get value() {
            return this._value
        },
        set value(newVal) {
            this._value = newVal
            GM_setValue("msg_send", newVal)
        }
    }
    function dicerConvert(num) {
        if (num <= 5) {
            return num
        }
        if (num === 10) {
            return 6
        }
        if (num === 20) {
            return 7
        }
        if (num === 80) {
            return 8
        }
        if (num === 500) {
            return 9
        }
        document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
            "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #7f0000\">Error: Get back mult not found!</span></div>"
        chatScroll()
        return 10
    }
    function convertDicer(num) {
        if (num <= 5) {
            return num
        }
        if (num === 6) {
            return 10
        }
        if (num === 7) {
            return 20
        }
        if (num === 8) {
            return 80
        }
        if (num === 9) {
            return 500
        }
    }
    const dicerResult = {
        _value: GM_getValue("dicerResult", new Array(15).fill(0)),
        get value() {
            return this._value
        },
        set value(newVal) {
            this._value = newVal
            GM_setValue("dicerResult", newVal)
        }
    }
    function rarityConvert(rar) {
        if (rar === "Common") {
            return 1
        }
        if (rar === "Unusual") {
            return 2
        }
        if (rar === "Rare") {
            return 3
        }
        if (rar === "Epic") {
            return 4
        }
        if (rar === "Legendary") {
            return 5
        }
        if (rar === "Mythic") {
            return 6
        }
        if (rar === "Ultimate") {
            return 7
        }
        document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
            "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #7f0000\">Error: Rarity not found!</span></div>"
        chatScroll()
        return 0
    }
    function convertRarity(num) {
        if (num === 1) {
            return "Common"
        }
        if (num === 2) {
            return "Unusual"
        }
        if (num === 3) {
            return "Rare"
        }
        if (num === 4) {
            return "Epic"
        }
        if (num === 5) {
            return "Legendary"
        }
        if (num === 6) {
            return "Mythic"
        }
        if (num === 7) {
            return "Ultimate"
        }
    }
    const craftAtt = {
        _value: GM_getValue("craftAtt", new Array(10).fill().map(() => new Array(150).fill("0/0"))),
        get value() {
            return this._value
        },
        set value(newVal) {
            this._value = newVal
            GM_setValue("craftAtt", newVal)
        }
    }
    // 初始内置数据表
    const defaultMobValues = {
        "Black Hole": -1,
        "Ghost": -0.5,
        "Slime": 0,
        "Chest": 0,
        "Kitten": 0.5,
        "Angel": 0.5,
        "Rooster": 1,
        "Printer": 1,
        "Fish": 1.2,
        "Shopkeeper": 1.2,
        "Soldier Ant": 1.5,
        "Jellyfish": 1.8,
        "Mojo Slime": 1.8,
        "Big Chest": 1.8,
        "Orga": 2,
        "Goomba": 2,
        "Leafbug": 2,
        "Bomber": 2.2,
        "Shell": 2.2,
        "Needle": 2.5,
        "Crab": 2.5,
        "Spider": 3,
        "Ladybug": 3.2,
        "Crystal": 3.5,
        "Bee": 3.5,
        "Ethereal Slime": 3.8,
        "Shiny Slime": 4,
        "Demon Slime": 4,
        "Giant Chest": 4,
        "Unique Ladybug": 5,
        "Huge Spider": 5,
        "Inspo Shroom": 5.5
    };

    // BCorDEF计算
    function mobConvert(mob) {
        const mobValues = GM_getValue("mobValues", defaultMobValues)
        return mobValues[mob] ?? 0;
    }

    function refreshMobData() {
        fetch("https://raccon-api.davidx.top/")
            .then(response => response.json())
            .then(data => {
                GM_setValue("mobValues", data)
                return 0
            })
            .catch(err => {
                console.error("Data refresh error", err)
                return 1
            })
    }

    function slotConvert(rar) {
        let converted = rarityConvert(rar)
        if (converted > 2) {
            return converted + 3
        }
        return 5
    }
    function rarityATK(rar) {
        let converted = rarityConvert(rar)
        if (converted === 1) {
            return 1
        }
        if (converted === 2) {
            return 2.1
        }
        if (converted === 3) {
            return 3.3
        }
        if (converted === 4) {
            return 4.6
        }
        if (converted === 5) {
            return 6
        }
        if (converted === 6) {
            return 8
        }
        if (converted === 7) {
            return 12
        }
        return 0
    }
    function rarityFactorMob(rar) {
        let converted = rarityConvert(rar)
        if (converted === 1) {
            return 1
        }
        if (converted === 2) {
            return 1.2
        }
        if (converted === 3) {
            return 1.3
        }
        if (converted === 4) {
            return 1.5
        }
        if (converted === 5) {
            return 1.7
        }
        if (converted === 6) {
            return 2.0
        }
        if (converted === 7) {
            return 3.0
        }
        return 0
    }
    function DEFcalc(mob, rar) {
        if (mob == "Angel Slime") {
            return 0
        }
        let returnValue = slotConvert(rar) * rarityATK(rar);
        if (mobConvert(mob) > 0) {
            returnValue = returnValue + mobConvert(mob) * rarityFactorMob(rar)
        }
        else {
            returnValue = returnValue + mobConvert(mob)
        }
        returnValue = Math.floor(returnValue * 10 + 0.9) / 10
        return returnValue
    }
    function probCor(rar, prob) {
        let converted = rarityConvert(rar)
        if (converted == 6) {
            if (prob == 5) {
                return -31
            }
            if (prob == 15) {
                return -23
            }
            if (prob == 30) {
                return -18
            }
            if (prob == 50) {
                return -10
            }
            if (prob == 80) {
                return 0
            }
            if (prob == 100) {
                return 1
            }
            if (prob == 120) {
                return 8
            }
            if (prob == 200) {
                return 18
            }
        }
        if (converted == 5) {
            if (prob == 5) {
                return -22
            }
            if (prob == 15) {
                return -15
            }
            if (prob == 30) {
                return -11
            }
            if (prob == 50) {
                return -5
            }
            if (prob == 80) {
                return 0
            }
            if (prob == 100) {
                return 1
            }
            if (prob == 120) {
                return 6
            }
            if (prob == 200) {
                return 16
            }
        }
        if (converted <= 4) return 0
    }
    function nextTier(mob, rar, ATK) {
        let DEF = DEFcalc(mob, rar)
        if (rar === "Ultimate") {
            if (ATK + 0.00075 < DEF - 68) {
                return "<p>Next Tier: 5%(" + ATKprint(DEF - 68 + 0.00075) + ")"
            }
            if (ATK + 0.00075 < DEF - 60) {
                return "<p>Next Tier: 10%(" + ATKprint(DEF - 60 + 0.00075) + ")"
            }
            if (ATK + 0.00075 < DEF - 53) {
                return "<p>Next Tier: 15%(" + ATKprint(DEF - 53 + 0.00075) + ")"
            }
            if (ATK + 0.00075 < DEF - 40) {
                return "<p>Next Tier: 20%(" + ATKprint(DEF - 40 + 0.00075) + ")"
            }
            return "Next Tier: 0.075%(" + 636.1 + ")"
        } else {
            if (ATK + 0.00075 < DEF + probCor(rar, 5)) {
                return "Next Tier: 5%(" + ATKprint(DEF + probCor(rar, 5) + 0.00075) + ")"
            }
            if (ATK + 0.00075 < DEF + probCor(rar, 15)) {
                return "Next Tier: 15%(" + ATKprint(DEF + probCor(rar, 15) + 0.00075) + ")"
            }
            if (ATK + 0.00075 < DEF + probCor(rar, 30)) {
                return "Next Tier: 30%(" + ATKprint(DEF + probCor(rar, 30) + 0.00075) + ")"
            }
            if (ATK + 0.00075 < DEF + probCor(rar, 50)) {
                return "Next Tier: 50%(" + ATKprint(DEF + probCor(rar, 50) + 0.00075) + ")"
            }
            if (ATK + 0.00075 < DEF + probCor(rar, 80)) {
                return "Next Tier: 80%(" + ATKprint(DEF + probCor(rar, 80) + 0.00075) + ")"
            }
            if (ATK + 0.00075 < DEF + probCor(rar, 100)) {
                return "Next Tier: 5%(" + ATKprint(DEF + probCor(rar, 100) + 0.00075) + ")"
            }
            if (ATK + 0.00075 < DEF + probCor(rar, 120)) {
                return "Next Tier: Bomb(" + ATKprint(DEF + probCor(rar, 120) + 0.00075) + ")"
            }
            if (ATK + 0.00075 < DEF + probCor(rar, 200)) {
                return "Next Tier: Double(" + ATKprint(DEF + probCor(rar, 200) + 0.00075) + ")"
            }
            return "Max Tier"
        }
    }

    function calcDEFdisplay() {
        if (unsafeWindow.location.pathname.startsWith("/e/mobinfo") === true || unsafeWindow.location.pathname.startsWith("/mobinfo") === true) {
            const cardInfo = document.querySelector('.cardinfo')

            if (cardInfo) {
                const existingCalcDEF = Array.from(cardInfo.querySelectorAll('div')).find(div =>
                    div.innerText.includes('CalcDEF')
                );

                if (!existingCalcDEF) {
                    const params = new URLSearchParams(window.location.search)
                    let mobName = params.get('n')
                    let mobRarityInt = parseInt(params.get('r'), 10)
                    let mobRarity = convertRarity(mobRarityInt)
                    console.log(mobName + " " + mobRarity)
                    const newDiv = document.createElement('div')
                    newDiv.style.marginBottom = '10px'
                    newDiv.innerHTML = `<b><span style="color: #7eef6d;">CalcDEF: </span><span style="color: #fff;">` + ATKprint(DEFcalc(mobName, mobRarity) + 0.00075) + `</span></b>`

                    const defenseDiv = Array.from(cardInfo.querySelectorAll('div')).find(div =>
                        div.innerText.includes('Defense')
                    );

                    if (defenseDiv) {
                        defenseDiv.after(newDiv)
                    } else {
                        cardInfo.appendChild(newDiv)
                    }
                }
            }
        }
    }
    setInterval(calcDEFdisplay, 1000)

    function ATKdisplay() {
        if (unsafeWindow.location.pathname.startsWith("/e/mob") === true || unsafeWindow.location.pathname.startsWith("/e/limit") === true || unsafeWindow.location.pathname.startsWith("/mob") === true || unsafeWindow.location.pathname.startsWith("/limit") === true) {
            if (document.querySelector('img[src*="/mob/"]') !== null && document.querySelector('img[src*="/mob/"]').parentElement.className !== "getboss show" &&
                document.querySelector('img[src*="/mob/"]').parentElement.children[document.querySelector('img[src*="/mob/"]').parentElement.children.length - 1].innerHTML.includes("Tier") === false) {
                let mobName = document.querySelector('img[src*="/mob/"]').parentElement.children[document.querySelector('img[src*="/mob/"]').parentElement.children.length - 1].innerHTML.match(/^.*?(?=<br>)/)[0]
                let mobRarity = document.querySelector('img[src*="/mob/"]').parentElement.children[document.querySelector('img[src*="/mob/"]').parentElement.children.length - 1].innerHTML.match(/(?<=">).*?(?=<\/span>)/)[0]
                let myATK = document.querySelector("tr:nth-child(3) td:nth-child(4) span").innerHTML
                if (myATK.includes(".")) {
                    myATK = parseInt(myATK.match(/^\d+/), 10) + parseInt(myATK.match(/(?<=\.)\d+/), 10) / 10
                } else {
                    myATK = parseInt(myATK, 10)
                }
                document.querySelector('img[src*="/mob/"]').parentElement.children[document.querySelector('img[src*="/mob/"]').parentElement.children.length - 1].innerHTML =
                    document.querySelector('img[src*="/mob/"]').parentElement.children[document.querySelector('img[src*="/mob/"]').parentElement.children.length - 1].innerHTML +
                    "<br><span style=\"color: #7eef6d\">DEF: " + ATKprint(DEFcalc(mobName, mobRarity) + 0.00075) + "</span>"


                document.querySelector('img[src*="/mob/"]').parentElement.children[document.querySelector('img[src*="/mob/"]').parentElement.children.length - 1].innerHTML =
                    document.querySelector('img[src*="/mob/"]').parentElement.children[document.querySelector('img[src*="/mob/"]').parentElement.children.length - 1].innerHTML +
                    "<br><span style=\"color: #7eef6d\">" + nextTier(mobName, mobRarity, myATK) + "</span>"
            }
        }
    }
    setInterval(ATKdisplay, 1000)

    function PFLFcheck(num) {
        if ((typeof num) !== "number" || Number.isInteger(num) == false || num < 0 || isNaN(num)) {
            return false
        }
        if (Math.sqrt(num) === Math.floor(Math.sqrt(num))) {
            return true
        }
        if (Math.cbrt(num) === Math.floor(Math.cbrt(num))) {
            return true
        }
        return false
    }
    function check1A2B(num) {
        if ((typeof num) !== "number" || Number.isInteger(num) == false || num < 0 || num > 9999 || isNaN(num)) {
            return false
        }
        let testWithStr = "" + num
        while (testWithStr.length < 4) {
            testWithStr = "0" + testWithStr
        }
        for (let i = 0; i < 3; i++) {
            for (let j = i + 1; j <= 3; j++) {
                if (testWithStr[i] === testWithStr[j]) {
                    return false
                }
            }
        }
        return true
    }
    //默认值：赌unusual及以下 dice
    function diceRule(value) {
        if (/^\d+\.\d+\b/.test(value) === false) {
            return false
        }
        let testID = parseInt(value.match(/^\d+/)[0], 10), testRarity = parseInt(value.match(/(?<=\.)\d+/)[0], 10)
        if (testID !== 33) {
            return false
        }
        if (testRarity < 3) {
            return true
        }
        return false
    }
    //默认值：合成epic及以下卡片，并且只合成unusual及以上卡片，但不包括unusual及以下dice和unusual atom（这段判定用于合成unusual及以下的时候）
    function craftRule(value) {
        if (/^\d+\.\d+\b/.test(value) === false) {
            return false
        }
        let testID = parseInt(value.match(/^\d+/)[0], 10), testRarity = parseInt(value.match(/(?<=\.)\d+/)[0], 10)
        if (testRarity > 4) {
            return false
        }
        if (testID === 33) {
            return false
        }
        if (testID < 0 || testID > 100) {
            return false
        }
        return true
    }
    let goDice = false
    //默认值：x10及以上就停止
    async function allDice() {
        if (unsafeWindow.location.pathname.startsWith("/e/npc") === false && unsafeWindow.location.pathname.startsWith("/npc") === false) {
            document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #7f0000\">Error: Not dicing!</span></div>"
            chatScroll()
            return
        }
        if (/33/.test(document.getElementById("1").value) === false) {
            document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #7f0000\">Error: Not dicing!</span></div>"
            chatScroll()
            return
        }
        document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
            "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #8296ff\">Dicing...</span></div>"
        chatScroll()
        goDice = true
        let canDice = true
        while (goDice && canDice) {
            canDice = false
            for (let i = document.getElementsByName("cardchoose").length - 1; i >= 0; i--) {
                if (canDice == false && goDice && diceRule(document.getElementsByName("cardchoose")[i].value)) {
                    document.getElementsByName("cardchoose")[i].checked = 1
                    await delay(200)
                    unsafeWindow.dicego()
                    while (document.getElementsByName("cardchoose").length > i && document.getElementsByName("cardchoose")[i].checked) {
                        await delay(100)
                    }
                    await delay(500)
                    let testGetBack = document.getElementById("ans").innerHTML.match(/(?<=x )\d+/)
                    if (testGetBack !== null) {
                        testGetBack = parseInt(testGetBack[0], 10)
                        let testArray = dicerResult.value
                        testArray[dicerConvert(testGetBack)]++
                        testArray[4]++
                        dicerResult.value = testArray
                    }
                    if (/x (10|20|80|500)/.test(document.getElementById("ans").innerHTML)) {
                        goDice = false
                    }
                    canDice = true
                }
            }
        }
        document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
            "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #8296ff\">Dice ended</span></div>"
        chatScroll()
    }
    async function singleDice(value) {
        if (unsafeWindow.location.pathname.startsWith("/e/npc") === false && unsafeWindow.location.pathname.startsWith("/npc") === false) {
            document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #7f0000\">Error: Not dicing!</span></div>"
            chatScroll()
            return
        }
        if (/33/.test(document.getElementById("1").value) === false) {
            document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #7f0000\">Error: Not dicing!</span></div>"
            chatScroll()
            return
        }
        document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
            "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #8296ff\">Dicing single dice...</span></div>"
        chatScroll()
        for (let i = document.getElementsByName("cardchoose").length - 1; i >= 0; i--) {
            if (document.getElementsByName("cardchoose")[i].value === value) {
                document.getElementsByName("cardchoose")[i].checked = 1
                await delay(200)
                unsafeWindow.dicego()
                while (document.getElementsByName("cardchoose").length > i && document.getElementsByName("cardchoose")[i].checked) {
                    await delay(100)
                }
                await delay(500)
                let testGetBack = document.getElementById("ans").innerHTML.match(/(?<=x )\d+/)
                if (testGetBack !== null) {
                    testGetBack = parseInt(testGetBack[0], 10)
                    let testArray = dicerResult.value
                    testArray[dicerConvert(testGetBack)]++
                    testArray[4]++
                    dicerResult.value = testArray
                }
            }
        }
        document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
            "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #8296ff\">Dice ended</span></div>"
        chatScroll()
    }
    let goCraft = false
    async function allCraft() {
        if (unsafeWindow.location.pathname.startsWith("/e/craftcard") === false && unsafeWindow.location.pathname.startsWith("/craftcard") === false) {
            document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #7f0000\">Error: Not crafting!</span></div>"
            chatScroll()
            return
        }
        document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
            "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #ffa090\">Crafting...</span></div>"
        chatScroll()
        goCraft = true
        let canCraft = true
        while (goCraft && canCraft) {
            canCraft = false
            for (let i = document.getElementsByName("cardchoose").length - 1; i >= 0; i--) {
                if (canCraft == false && goCraft && craftRule(document.getElementsByName("cardchoose")[i].value) && parseInt(document.getElementsByName("cardchoose")[i].labels[0].innerText.match(/\d+/)[0], 10) >= 5) {
                    let pendingRarity = parseInt(document.getElementsByName("cardchoose")[i].value.match(/(?<=\.)\d+/)[0], 10)
                    document.getElementsByName("cardchoose")[i].checked = 1
                    await delay(200)
                    document.getElementById("nownum").innerHTML = parseInt(document.getElementsByName("cardchoose")[i].labels[0].innerText.match(/\d+/)[0], 10)
                    unsafeWindow.craftchange()
                    await delay(200)
                    unsafeWindow.craftcard()
                    while (document.getElementsByName("cardchoose").length > i && document.getElementsByName("cardchoose")[i].checked) {
                        await delay(100)
                    }
                    await delay(500)
                    let currentAtt = parseInt(document.getElementById("nowatt").innerHTML.match(/\d+/)[0], 10)
                    let matchAtt = document.getElementById("ans").innerHTML.match(/(?<=（)(-\d|-5, \+1)(?=）)/g)
                    let testArray = craftAtt.value
                    for (let i = 0; i < matchAtt.length; i++) {
                        let testTotal1 = parseInt(testArray[pendingRarity][0].match(/\d+/)[0], 10), testTotal2 = parseInt(testArray[pendingRarity][0].match(/(?<=\/)\d+/)[0], 10)
                        let testCurrent1 = parseInt(testArray[pendingRarity][currentAtt].match(/\d+/)[0], 10), testCurrent2 = parseInt(testArray[pendingRarity][currentAtt].match(/(?<=\/)\d+/)[0], 10)
                        if (matchAtt[i].length < 4) {
                            testTotal1++
                            testTotal2 = 0
                            testCurrent2++
                            testArray[pendingRarity][0] = "" + testTotal1 + "/" + testTotal2
                            testArray[pendingRarity][currentAtt] = "" + testCurrent1 + "/" + testCurrent2
                            currentAtt++
                        } else {
                            testTotal1 = 0
                            testTotal2++
                            testCurrent1++
                            testCurrent2++
                            testArray[pendingRarity][0] = "" + testTotal1 + "/" + testTotal2
                            testArray[pendingRarity][currentAtt] = "" + testCurrent1 + "/" + testCurrent2
                            currentAtt = 1
                        }
                    }
                    craftAtt.value = testArray
                    canCraft = true
                }
            }
        }
        document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
            "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #ffa090\">Craft ended</span></div>"
        chatScroll()
    }
    async function singleCraft(value) {
        if (unsafeWindow.location.pathname.startsWith("/e/craftcard") === false && unsafeWindow.location.pathname.startsWith("/craftcard") === false) {
            document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #7f0000\">Error: Not crafting!</span></div>"
            chatScroll()
            return
        }
        document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
            "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #ffa090\">Crafting single card...</span></div>"
        chatScroll()
        for (let i = document.getElementsByName("cardchoose").length - 1; i >= 0; i--) {
            if (document.getElementsByName("cardchoose")[i].value === value && parseInt(document.getElementsByName("cardchoose")[i].labels[0].innerText.match(/\d+/)[0], 10) >= 5) {
                let pendingRarity = parseInt(document.getElementsByName("cardchoose")[i].value.match(/(?<=\.)\d+/)[0], 10)
                document.getElementsByName("cardchoose")[i].checked = 1
                await delay(200)
                document.getElementById("nownum").innerHTML = parseInt(document.getElementsByName("cardchoose")[i].labels[0].innerText.match(/\d+/)[0], 10)
                unsafeWindow.craftchange()
                await delay(200)
                unsafeWindow.craftcard()
                while (document.getElementsByName("cardchoose").length > i && document.getElementsByName("cardchoose")[i].checked) {
                    await delay(100)
                }
                await delay(500)
                let currentAtt = parseInt(document.getElementById("nowatt").innerHTML.match(/\d+/)[0], 10)
                let matchAtt = document.getElementById("ans").innerHTML.match(/(?<=（)(-\d|-5, \+1)(?=）)/g)
                let testArray = craftAtt.value
                for (let i = 0; i < matchAtt.length; i++) {
                    let testTotal1 = parseInt(testArray[pendingRarity][0].match(/\d+/)[0], 10), testTotal2 = parseInt(testArray[pendingRarity][0].match(/(?<=\/)\d+/)[0], 10)
                    let testCurrent1 = parseInt(testArray[pendingRarity][currentAtt].match(/\d+/)[0], 10), testCurrent2 = parseInt(testArray[pendingRarity][currentAtt].match(/(?<=\/)\d+/)[0], 10)
                    if (matchAtt[i].length < 4) {
                        testTotal1++
                        testTotal2 = 0
                        testCurrent2++
                        testArray[pendingRarity][0] = "" + testTotal1 + "/" + testTotal2
                        testArray[pendingRarity][currentAtt] = "" + testCurrent1 + "/" + testCurrent2
                        currentAtt++
                    } else {
                        testTotal1 = 0
                        testTotal2++
                        testCurrent1++
                        testCurrent2++
                        testArray[pendingRarity][0] = "" + testTotal1 + "/" + testTotal2
                        testArray[pendingRarity][currentAtt] = "" + testCurrent1 + "/" + testCurrent2
                        currentAtt = 1
                    }
                }
                craftAtt.value = testArray
            }
        }
        document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
            "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #ffa090\">Craft ended</span></div>"
        chatScroll()
    }
    const oldSend = unsafeWindow.send
    unsafeWindow.send = function () {
        const messageValue = document.getElementById("message").value
        let newMessageValue = messageValue
        newMessageValue = newMessageValue.replaceAll(/(?<!\s)(?!\s{2}\S)\s+/g, "  ")
        //使用方法：.scroll on或者.scroll off，开启或关闭聊天室自动滚动
        if (newMessageValue.slice(0, 8) === ".scroll ") {
            newMessageValue = newMessageValue.slice(9)
            if (newMessageValue.slice(0, 2) === "on") {
                document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                    "<div><span style=\"color: #7eef6d\">[SCRIPT] Scroll is on</span></div>"
                auto_scroll.value = true
                chatScroll()
            }
            if (newMessageValue.slice(0, 3) === "off") {
                document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                    "<div><span style=\"color: #7eef6d\">[SCRIPT] Scroll is off</span></div>"
                chatScroll()
                auto_scroll.value = false
            }
            newMessageValue = ""
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.animation angelslime/none/random
        if (newMessageValue.slice(0, 11) === ".animation ") {
            newMessageValue = newMessageValue.slice(12)
            if (newMessageValue.slice(0, 10) === "angelslime") {
                document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                    "<div><span style=\"color: #7eef6d\">[SCRIPT] Animation Type: Angel Slime only</span></div>"
                GM_setValue('animationType', 'angelslime');
            }
            else if (newMessageValue.slice(0, 4) === "none") {
                document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                    "<div><span style=\"color: #7eef6d\">[SCRIPT] Animation Type: None</span></div>"
                GM_setValue('animationType', 'none');
            }
            else if (newMessageValue.slice(0, 6) === "random") {
                document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                    "<div><span style=\"color: #7eef6d\">[SCRIPT] Animation Type: Random (Unchanged)</span></div>"
                GM_setValue('animationType', 'random');
            }
            else {
                document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                    "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #7f0000\">Error: Invalid animation type, can only be angelslime/none/random</span></div>"
            }
            chatScroll()
            newMessageValue = ""
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.bg off/on，可以开启或关闭背景图片（刷新生效）
        if (newMessageValue.slice(0, 4) === ".bg ") {
            newMessageValue = newMessageValue.slice(5)
            if (newMessageValue.slice(0, 2) === "on") {
                document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                    "<div><span style=\"color: #7eef6d\">[SCRIPT] Background turned on, refresh to take effect!</span></div>"
                chatScroll()
                GM_setValue('bg_display', true)
            }
            if (newMessageValue.slice(0, 3) === "off") {
                document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                    "<div><span style=\"color: #7eef6d\">[SCRIPT] Background turned off, refresh to take effect!</span></div>"
                chatScroll()
                GM_setValue('bg_display', false)
            }
            newMessageValue = ""
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.rep on或者.rep off，可以替换一些输入的文本
        if (newMessageValue.slice(0, 5) === ".rep ") {
            newMessageValue = newMessageValue.slice(6)
            if (newMessageValue.slice(0, 2) === "on") {
                document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                    "<div><span style=\"color: #7eef6d\">[SCRIPT] Replace is on</span></div>"
                chatScroll()
                com_rep.value = true
            }
            if (newMessageValue.slice(0, 3) === "off") {
                document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                    "<div><span style=\"color: #7eef6d\">[SCRIPT] Replace is off</span></div>"
                chatScroll()
                com_rep.value = false
            }
            newMessageValue = ""
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.dil on或者.dil off，可以膨胀输入的文本
        if (newMessageValue.slice(0, 5) === ".dil ") {
            newMessageValue = newMessageValue.slice(6)
            if (newMessageValue.slice(0, 2) === "on") {
                document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                    "<div><span style=\"color: #7eef6d\">[SCRIPT] Dilate is on</span></div>"
                chatScroll()
                com_dil.value = true
            }
            if (newMessageValue.slice(0, 3) === "off") {
                document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                    "<div><span style=\"color: #7eef6d\">[SCRIPT] Dilate is off</span></div>"
                chatScroll()
                com_dil.value = false
            }
            newMessageValue = ""
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.rev 一段文字，输出效果为顺序反过来的文字
        if (newMessageValue.slice(0, 5) === ".rev ") {
            newMessageValue = newMessageValue.slice(6)
            let tempMessage = ""
            for (let i = newMessageValue.length - 1; i >= 0; i--) {
                tempMessage = tempMessage + newMessageValue[i]
            }
            newMessageValue = tempMessage
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.half 一段文字，输出效果为一半的文字
        if (newMessageValue.slice(0, 6) === ".half ") {
            newMessageValue = newMessageValue.slice(7)
            let tempMessage = ""
            for (let i = 0; i < newMessageValue.length; i += 2) {
                if (newMessageValue[i] !== " ") {
                    tempMessage = tempMessage + newMessageValue[i]
                }
            }
            newMessageValue = tempMessage
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.PFLFstart，可以开启PFLF
        if (newMessageValue === ".PFLFstart") {
            if (PFLFstart.value === true) {
                document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                    "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #7f0000\">Error: Already started PFLF!</span></div>"
                chatScroll()
                newMessageValue = ""
            } else {
                document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                    "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #ff00ff\">PFLF started!</span></div>"
                chatScroll()
                PFLFstart.value = true
                PFLFturn.value = 0
                PFLFscore.value = -1
                PFLFclear.value = 0
                PFLFdice.value = -1001;
                com_rep.value = false;
                newMessageValue = ".claim  0"
            }
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.PFLFend，可以结束PFLF
        if (newMessageValue === ".PFLFend") {
            if (PFLFstart.value === false) {
                document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                    "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #7f0000\">Error: PFLF is not started!</span></div>"
                chatScroll()
            } else {
                document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                    "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #ff00ff\">PFLF ended!</span></div>"
                chatScroll()
                PFLFstart.value = false
            }
            newMessageValue = ""
            document.getElementById("message").value = newMessageValue
        }
        if (newMessageValue === ".getPFLF") {
            if (PFLFstart.value === false) {
                document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                    "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #7f0000\">Error: PFLF is not started!</span></div>"
                chatScroll()
                newMessageValue = ""
            } else {
                newMessageValue = "Turn: " + PFLFturn.value + ", Score: " + PFLFscore.value + ", Clear: " + PFLFclear.value + ", Dice: " + PFLFdice.value
            }
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.claim 一个数字，可以进行PFLF的1turn
        if (newMessageValue.slice(0, 7) === ".claim ") {
            newMessageValue = newMessageValue.slice(8)
            if (PFLFstart.value === false) {
                document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                    "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #7f0000\">Error: PFLF is not started!</span></div>"
                chatScroll()
                newMessageValue = ""
            } else {
                let testValid = true, claimNum = newMessageValue.match(/^\d+/)
                if (claimNum === null) {
                    testValid = false
                }
                if (testValid === true) {
                    claimNum = parseInt(claimNum[0], 10)
                    testValid = PFLFcheck(claimNum)
                }
                if (testValid === true) {
                    let testStr1 = String(PFLFdice.value), testStr2 = String(claimNum)
                    if (testStr1 === "0") {
                        testStr1 = ""
                    }
                    if (testStr2 === "0") {
                        testStr2 = ""
                    }
                    for (let i = 0; i < testStr2.length; i++) {
                        if (testStr1.indexOf(testStr2[i]) === -1) {
                            testValid = false
                        } else {
                            testStr1 = testStr1.slice(0, testStr1.indexOf(testStr2[i])) + testStr1.slice(testStr1.indexOf(testStr2[i]) + 1)
                        }
                    }
                    if (testValid === true) {
                        PFLFscore.value += (testStr2.length + 1) ** 3
                        if (testStr1 === "") {
                            PFLFclear.value++;
                            PFLFscore.value += 1000;
                        }
                        PFLFdice.value = parseInt("0" + testStr1, 10)
                        if (testStr1.length + PFLFroll.value > PFLFlimit.value) {
                            PFLFdice.value = "END"
                        }
                    }
                }
                if (testValid === true) {
                    if (PFLFdice.value === "END") {
                        newMessageValue = "Final Turn: " + PFLFturn.value + ", Score: " + PFLFscore.value + ", Clear: " + PFLFclear.value
                        PFLFstart.value = false
                    } else {
                        PFLFturn.value++;
                        for (let i = 1; i <= PFLFroll.value; i++) {
                            PFLFdice.value = PFLFdice.value * 10 + Math.floor(Math.random() * 6) + 1
                        }
                        newMessageValue = "Turn: " + PFLFturn.value + ", Score: " + PFLFscore.value + ", Clear: " + PFLFclear.value + ", Dice: " + PFLFdice.value
                    }
                } else {
                    document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                        "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #7f0000\">Error: Can not claim the number!</span></div>"
                    chatScroll()
                    newMessageValue = ""
                }
            }
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.PFLFset limit8或者limit9,roll3,roll4，修改PFLF的上限或每回合的新数
        if (newMessageValue.slice(0, 9) === ".PFLFset ") {
            newMessageValue = newMessageValue.slice(10)
            if (newMessageValue.slice(0, 6) === "limit8") {
                document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                    "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #ff00ff\">Limit is set to 8!</span></div>"
                chatScroll()
                PFLFlimit.value = 8
            }
            if (newMessageValue.slice(0, 6) === "limit9") {
                document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                    "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #ff00ff\">Limit is set to 9!</span></div>"
                chatScroll()
                PFLFlimit.value = 9
            }
            if (newMessageValue.slice(0, 5) === "roll3") {
                document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                    "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #ff00ff\">Roll is set to 3!</span></div>"
                chatScroll()
                PFLFroll.value = 3
            }
            if (newMessageValue.slice(0, 5) === "roll4") {
                document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                    "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #ff00ff\">Roll is set to 4!</span></div>"
                chatScroll()
                PFLFroll.value = 4
            }
            newMessageValue = ""
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.1A2Bstart，可以开启1A2B
        if (newMessageValue === ".1A2Bstart") {
            if (check1A2B(Num1A2B.value) === true) {
                document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                    "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #7f0000\">Error: Already started 1A2B!</span></div>"
                chatScroll()
                newMessageValue = ""
            } else {
                document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                    "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #00ffbf\">Generating 1A2B number!</span></div>"
                chatScroll()
                while (check1A2B(Num1A2B.value) === false) {
                    Num1A2B.value = Math.floor(Math.random() * 10000)
                }
                newMessageValue = "1A2B started!"
            }
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.1A2Bend，可以结束1A2B
        if (newMessageValue === ".1A2Bend") {
            if (check1A2B(Num1A2B.value) === false) {
                document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                    "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #7f0000\">Error: 1A2B is not started!</span></div>"
                chatScroll()
            } else {
                document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                    "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #00ffbf\">1A2B ended! The number is </span><span style=\"color: #bfff00\">" + Num1A2B.value + "</span></div>"
                chatScroll()
                Num1A2B.value = 0
            }
            newMessageValue = ""
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.randguess，可以进行一次随机猜测
        if (newMessageValue === ".randguess") {
            let Guessing = 0
            while (check1A2B(Guessing) === false) {
                Guessing = Math.floor(Math.random() * 10000)
            }
            newMessageValue = ".guess  " + Guessing
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.guess 一个数字，可以进行1A2B的1次猜测
        if (newMessageValue.slice(0, 7) === ".guess ") {
            newMessageValue = newMessageValue.slice(8)
            if (check1A2B(Num1A2B.value) === false) {
                document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                    "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #7f0000\">Error: 1A2B is not started!</span></div>"
                chatScroll()
                newMessageValue = ""
            } else {
                let testValid = true, guessNum = newMessageValue.match(/^\d+/)
                if (guessNum === null) {
                    testValid = false
                }
                if (testValid === true) {
                    guessNum = parseInt(guessNum[0], 10)
                    testValid = check1A2B(guessNum)
                    if (guessNum === Num1A2B.value) {
                        let testStr1 = "" + Num1A2B.value
                        while (testStr1.length < 4) {
                            testStr1 = "0" + testStr1
                        }
                        newMessageValue = "You win! " + testStr1 + " is the answer"
                        Num1A2B.value = 0
                    } else {
                        let testA = 0, testB = 0, testStr1 = "" + Num1A2B.value, testStr2 = "" + guessNum, saveStr
                        while (testStr1.length < 4) {
                            testStr1 = "0" + testStr1
                        }
                        while (testStr2.length < 4) {
                            testStr2 = "0" + testStr2
                        }
                        saveStr = testStr2
                        for (let i = 3; i >= 0; i--) {
                            if (testStr1[i] === testStr2[i]) {
                                testA++
                                testStr1 = testStr1.slice(0, i) + testStr1.slice(i + 1)
                                testStr2 = testStr2.slice(0, i) + testStr2.slice(i + 1)
                            }
                        }
                        for (let i = testStr1.length - 1; i >= 0; i--) {
                            for (let j = testStr2.length - 1; j >= 0; j--) {
                                if (testStr1[i] === testStr2[j]) {
                                    testB++
                                    testStr1 = testStr1.slice(0, i) + testStr1.slice(i + 1)
                                    testStr2 = testStr2.slice(0, j) + testStr2.slice(j + 1)
                                    j = -1
                                }
                            }
                        }
                        newMessageValue = "Guess " + saveStr + ": " + testA + "A" + testB + "B"
                    }
                }
                if (testValid === false) {
                    document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                        "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #7f0000\">Error: Invalid guess!</span></div>"
                    chatScroll()
                    newMessageValue = ""
                }
            }
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.refresh，刷新怪物数据
        if (newMessageValue === ".refresh") {
            let returnValue = refreshMobData()
            if (returnValue === 0) {
                document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                    "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #7f0000\">Error: Failed to refresh!</span></div>"
                chatScroll()
            } else {
                document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                    "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #00ffbf\">Mob data refreshed!</span></div>"
                chatScroll()
            }
            newMessageValue = ""
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.send，开启消息发送（这条消息不会被发送）
        if (newMessageValue === ".send") {
            document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                "<div><span style=\"color: #7eef6d\">[SCRIPT] Send message is activated</span></div>"
            chatScroll()
            msg_send.value = true
            newMessageValue = ""
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.unsend，关闭消息发送
        if (newMessageValue === ".unsend") {
            document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                "<div><span style=\"color: #7eef6d\">[SCRIPT] Send message is inactivated</span></div>"
            chatScroll()
            msg_send.value = false
            newMessageValue = ""
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.loadcaptcha，加载reCaptcha
        if (newMessageValue === ".loadcaptcha") {
            loadCaptcha()
            newMessageValue = ""
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.pos pos，如.pos 24可以打开City4
        if (newMessageValue.slice(0, 5) === ".pos ") {
            newMessageValue = newMessageValue.slice(6)
            function ourChoosePos(thepos) {
                grecaptcha.ready(function () {
                    grecaptcha.execute("6LdeDqopAAAAAFhBk3q_TY7uB4QjU1QJ26viqZzm", { action: "submit" }).then(function (token) {
                        var url = "https://ruarua.ru/mob?pos=" + thepos + "&token=" + token;
                        reloadPjax(url, 0, 0)
                    });
                });
            }
            ourChoosePos(parseInt(newMessageValue, 10))
            newMessageValue = ""
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.craft，根据设定的规则自动合成
        if (newMessageValue === ".craft") {
            allCraft()
            newMessageValue = ""
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.scraft ID.rarity，如.scraft 1.3会合成所有rare exp，使用scraft合成也会计入数据
        if (newMessageValue.slice(0, 8) === ".scraft ") {
            newMessageValue = newMessageValue.slice(9)
            singleCraft(newMessageValue)
            newMessageValue = ""
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.craftadd Common 2 5 6能给Common卡的2att加上5次成功次数和6次总次数
        if (newMessageValue.slice(0, 10) === ".craftadd ") {
            newMessageValue = newMessageValue.slice(11)
            let testAdd1 = newMessageValue.match(/^[A-Za-z]+/), testAdd2 = newMessageValue.match(/(?<=\s)\d+/g)
            if (testAdd1 === null || testAdd2 === null) {
                document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                    "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #7f0000\">Error: Invalid parameter!</span></div>"
                chatScroll()
                newMessageValue = ""
            } else {
                document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                    "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #ffa090\">Craft state modified!</span></div>"
                chatScroll()
                let testArray = craftAtt.value
                let checkValue = testArray[rarityConvert(testAdd1[0])][parseInt(testAdd2[0], 10)]
                testArray[rarityConvert(testAdd1[0])][parseInt(testAdd2[0], 10)] = "" + (parseInt(checkValue.match(/^\d+/)[0], 10) + parseInt(testAdd2[1], 10)) + "/" + (parseInt(checkValue.match(/(?<=\/)\d+/)[0], 10) + parseInt(testAdd2[2], 10))
                craftAtt.value = testArray
                newMessageValue = ".craftstate  " + testAdd1
            }
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.endcraft，结束正在进行的craft
        if (newMessageValue === ".endcraft") {
            document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #ffa090\">Ending craft...</span></div>"
            chatScroll()
            goCraft = false
            newMessageValue = ""
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.craftstate，查看所有稀有度合成数据
        if (newMessageValue === ".craftstate") {
            for (let i = 1; i <= 6; i++) {
                let testArray = craftAtt.value
                let testStr = "Rarity: " + convertRarity(i)
                if (parseInt(testArray[i][0].match(/^\d+/)[0], 10) !== 0) {
                    testStr = testStr + "<br>You have a failing streak of " + parseInt(testArray[i][0].match(/^\d+/)[0], 10) + " craft"
                    if (parseInt(testArray[i][0].match(/^\d+/)[0], 10) !== 1) {
                        testStr = testStr + "s"
                    }
                }
                if (parseInt(testArray[i][0].match(/(?<=\/)\d+/)[0], 10) !== 0) {
                    testStr = testStr + "<br>You have a successing streak of " + parseInt(testArray[i][0].match(/(?<=\/)\d+/)[0], 10) + " craft"
                    if (parseInt(testArray[i][0].match(/(?<=\/)\d+/)[0], 10) !== 1) {
                        testStr = testStr + "s"
                    }
                }
                if (testStr.match("You") == null) {
                    testStr = testStr + "<br>You have no craft records at this rarity yet"
                }
                for (let j = 1; j <= 100; j++) {
                    if (parseInt(testArray[i][j].match(/(?<=\/)\d+/)[0], 10) !== 0) {
                        testStr = testStr + "<br>Att " + j + ": " + testArray[i][j]
                    }
                }
                document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                    "<div><span style=\"color: #7eef6d\">[SCRIPT] Craft State: <br></span>" + testStr + "</div>"
                chatScroll()
                auto_scroll.value = false
            }
            newMessageValue = ""
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.craftstate rarity（rarity可以是数字也可以是区分大小写的稀有度），查看该稀有度合成数据
        if (newMessageValue.slice(0, 12) === ".craftstate ") {
            newMessageValue = newMessageValue.slice(13)
            let testRarity = newMessageValue.match(/^\d+/)
            if (testRarity === null && newMessageValue.match(/^[A-Za-z]+/) !== null) {
                testRarity = rarityConvert(newMessageValue.match(/^[A-Za-z]+/)[0])
            } else {
                testRarity = parseInt(testRarity, 10)
            }
            if (testRarity === null || testRarity < 1 || testRarity > 6) {
                document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                    "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #7f0000\">Error: Invalid parameter!</span></div>"
                chatScroll()
            } else {
                let testArray = craftAtt.value
                let testStr = "Rarity: " + convertRarity(testRarity)
                if (parseInt(testArray[testRarity][0].match(/^\d+/)[0], 10) !== 0) {
                    testStr = testStr + "<br>You have a failing streak of " + parseInt(testArray[testRarity][0].match(/^\d+/)[0], 10) + " craft"
                    if (parseInt(testArray[testRarity][0].match(/^\d+/)[0], 10) !== 1) {
                        testStr = testStr + "s"
                    }
                }
                if (parseInt(testArray[testRarity][0].match(/(?<=\/)\d+/)[0], 10) !== 0) {
                    testStr = testStr + "<br>You have a successing streak of " + parseInt(testArray[testRarity][0].match(/(?<=\/)\d+/)[0], 10) + " craft"
                    if (parseInt(testArray[testRarity][0].match(/(?<=\/)\d+/)[0], 10) !== 1) {
                        testStr = testStr + "s"
                    }
                }
                if (testStr.match("You") == null) {
                    testStr = testStr + "<br>You have no craft records at this rarity yet"
                }
                for (let i = 1; i <= 100; i++) {
                    if (parseInt(testArray[testRarity][i].match(/(?<=\/)\d+/)[0], 10) !== 0) {
                        testStr = testStr + "<br>Att " + i + ": " + testArray[testRarity][i]
                    }
                }
                document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                    "<div><span style=\"color: #7eef6d\">[SCRIPT] Craft State: <br></span>" + testStr + "</div>"
                chatScroll()
                auto_scroll.value = false
            }
            newMessageValue = ""
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.craftclear，清除合成记录数据（谨慎使用！！！）
        if (newMessageValue === ".craftclear") {
            let testArray = craftAtt.value
            for (let i = 1; i <= 6; i++) {
                for (let j = 1; j <= 100; j++) {
                    testArray[i][j] = "0/0"
                }
            }
            craftAtt.value = testArray
            document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #ffa090\">Cleared craft result!</span></div>"
            chatScroll()
            newMessageValue = ""
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.dice，根据规则自动玩dicer
        if (newMessageValue === ".dice") {
            allDice()
            newMessageValue = ""
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.sdice 33.rarity，如.sdice 33.5会dicer一次legendary dice
        if (newMessageValue.slice(0, 7) === ".sdice ") {
            newMessageValue = newMessageValue.slice(8)
            singleDice(newMessageValue)
            newMessageValue = ""
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.diceadd 500 10可以加入10次x500数量，.diceadd 4 20可以加入20次dicer总次数
        if (newMessageValue.slice(0, 9) === ".diceadd ") {
            newMessageValue = newMessageValue.slice(10)
            let testAdd1 = newMessageValue.match(/^\d+/), testAdd2 = newMessageValue.match(/(?<=\s)\d+/)
            if (testAdd1 === null || testAdd2 === null) {
                document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                    "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #7f0000\">Error: Invalid parameter!</span></div>"
                chatScroll()
                newMessageValue = ""
            } else {
                document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                    "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #8296ff\">Dice state modified!</span></div>"
                chatScroll()
                let testArray = dicerResult.value
                testArray[dicerConvert(parseInt(testAdd1[0], 10))] += parseInt(testAdd2[0], 10)
                dicerResult.value = testArray
                newMessageValue = ".dicestate"
            }
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.dice，结束正在进行的dicer
        if (newMessageValue === ".enddice") {
            document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #8296ff\">Ending dice...</span></div>"
            chatScroll()
            goDice = false
            newMessageValue = ""
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.dicestate，查看dicer数据
        if (newMessageValue === ".dicestate") {
            let testStr = ""
            for (let i = 0; i <= 9; i++) {
                if (i !== 4) {
                    testStr = testStr + convertDicer(i) + "x back: " + dicerResult.value[i] + "/" + dicerResult.value[4]
                    if (i !== 9) {
                        testStr += "<br>"
                    }
                }
            }
            document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                "<div><span style=\"color: #7eef6d\">[SCRIPT] Dicer State: <br></span>" + testStr + "</div>"
            chatScroll()
            auto_scroll.value = false
            newMessageValue = ""
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.diceclear，清除dicer记录数据（谨慎使用！！！）
        if (newMessageValue === ".diceclear") {
            let testArray = dicerResult.value
            for (let i = 0; i <= 9; i++) {
                testArray[i] = 0
            }
            dicerResult.value = testArray
            document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #8296ff\">Cleared dice result!</span></div>"
            chatScroll()
            newMessageValue = ""
            document.getElementById("message").value = newMessageValue
        }
        if (newMessageValue[0] === ".") {
            document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                "<div><span style=\"color: #7eef6d\">[SCRIPT] </span><span style=\"color: #7f0000\">Error: Command does not exist!</span></div>"
            chatScroll()
            newMessageValue = ""
            document.getElementById("message").value = newMessageValue
        }
        if (com_rep.value) {
            let foundReplace
            const regex = /(?<!\d)(?<!\.)(?!0.075)(?!99.925%)\d+\.?\d+%(?![A-Za-z0-9])/g
            do {
                foundReplace = regex.exec(newMessageValue)
                if (foundReplace) {
                    let testRandomReplace = Math.floor(Math.random() * 10)
                    if (testRandomReplace <= 5) {
                        newMessageValue = newMessageValue.slice(0, foundReplace.index) + " 0.075% " + newMessageValue.slice(foundReplace.index + foundReplace[0].length)
                    }
                    if (testRandomReplace === 6) {
                        newMessageValue = newMessageValue.slice(0, foundReplace.index) + " 0.075 " + newMessageValue.slice(foundReplace.index + foundReplace[0].length)
                    }
                    if (testRandomReplace === 7) {
                        newMessageValue = newMessageValue.slice(0, foundReplace.index) + " o.o7s " + newMessageValue.slice(foundReplace.index + foundReplace[0].length)
                    }
                    if (testRandomReplace === 8) {
                        newMessageValue = newMessageValue.slice(0, foundReplace.index) + "零点零七五" + newMessageValue.slice(foundReplace.index + foundReplace[0].length)
                    }
                    if (testRandomReplace === 9) {
                        newMessageValue = newMessageValue.slice(0, foundReplace.index) + " 99.925% " + newMessageValue.slice(foundReplace.index + foundReplace[0].length)
                    }
                    regex.lastIndex = 0
                }
            } while (foundReplace)
            const regex2 = /(?<!\d)(?<!\.)(?=\d{4,}|\d{2,}\.\d{1,}|\d{1,}\.\d{2,})(?!\d*1316)(?!\d*3135)(?!\d*5156)(?!\d*6361)(?!\d*6055)(?!\d*308.25)(?!\d*0.075)(?!\d*99.925)\d*\.?\d*(?!\d)(?!\.)/g
            do {
                foundReplace = regex2.exec(newMessageValue)
                if (foundReplace) {
                    let testRandomReplace = Math.floor(Math.random() * 4)
                    if (testRandomReplace === 0) {
                        newMessageValue = newMessageValue.slice(0, foundReplace.index) + " e308.25 " + newMessageValue.slice(foundReplace.index + foundReplace[0].length)
                    }
                    if (testRandomReplace === 1) {
                        newMessageValue = newMessageValue.slice(0, foundReplace.index) + " 1.8e308 " + newMessageValue.slice(foundReplace.index + foundReplace[0].length)
                    }
                    if (testRandomReplace === 2) {
                        newMessageValue = newMessageValue.slice(0, foundReplace.index) + " Infinite " + newMessageValue.slice(foundReplace.index + foundReplace[0].length)
                    }
                    if (testRandomReplace === 3) {
                        newMessageValue = newMessageValue.slice(0, foundReplace.index) + "∞" + newMessageValue.slice(foundReplace.index + foundReplace[0].length)
                    }
                    regex2.lastIndex = 0
                }
            } while (foundReplace)
            const regex3 = /(?<!\d)(?!7s)(?!5hours)(?!300min)(?!18000sec)(\d+\s?(s|sec|second|m|min|minute|h|hour|d|day)s?(?![A-Za-z0-9])|\d+[:|：]\d{2}(?![A-Za-z0-9]))/g
            do {
                foundReplace = regex3.exec(newMessageValue)
                if (foundReplace) {
                    let testRandomReplace = Math.floor(Math.random() * 10)
                    if (testRandomReplace <= 5) {
                        newMessageValue = newMessageValue.slice(0, foundReplace.index) + " 5hours " + newMessageValue.slice(foundReplace.index + foundReplace[0].length)
                    }
                    if (testRandomReplace === 6) {
                        newMessageValue = newMessageValue.slice(0, foundReplace.index) + " 300minutes " + newMessageValue.slice(foundReplace.index + foundReplace[0].length)
                    }
                    if (testRandomReplace === 7) {
                        newMessageValue = newMessageValue.slice(0, foundReplace.index) + " 300min " + newMessageValue.slice(foundReplace.index + foundReplace[0].length)
                    }
                    if (testRandomReplace === 8) {
                        newMessageValue = newMessageValue.slice(0, foundReplace.index) + " 18000seconds " + newMessageValue.slice(foundReplace.index + foundReplace[0].length)
                    }
                    if (testRandomReplace === 9) {
                        newMessageValue = newMessageValue.slice(0, foundReplace.index) + " 18000sec " + newMessageValue.slice(foundReplace.index + foundReplace[0].length)
                    }
                    regex3.lastIndex = 0
                }
            } while (foundReplace)
            newMessageValue = newMessageValue.replaceAll(/(?!6055)[bB6][oO0][sS5][sS5]/g, " 6055 ")
            newMessageValue = newMessageValue.replaceAll(/(?<![A-Za-z0-9])[f|F][r|R][e|E][e|E]/g, "付费")
            newMessageValue = newMessageValue.replaceAll(/[m|M][o|O][d|D][e|E](?![A-Za-z0-9])/g, "模式")
            newMessageValue = newMessageValue.replaceAll(/<(?!\s)/g, "< ")
        }
        if (com_dil.value) {
            for (let i = newMessageValue.length - 1; i >= 1; i--) {
                newMessageValue = newMessageValue.slice(0, i) + '  ' + newMessageValue.slice(i)
            }
            newMessageValue = newMessageValue.replaceAll(/\s{5,}/g, " // ")
        }
        newMessageValue = newMessageValue.replaceAll("kys", "k!y!s!")
        newMessageValue = newMessageValue.replaceAll("nm", "n!m!")
        newMessageValue = newMessageValue.replaceAll("rz", "r!z!")
        newMessageValue = newMessageValue.replaceAll(/s\s?b/g, "s!b!")
        newMessageValue = newMessageValue.replaceAll("stfu", "s!t!f!u!")
        newMessageValue = newMessageValue.replaceAll("cum", "c!u!m!")
        newMessageValue = newMessageValue.replaceAll("nig", "n!i!g!")
        let findSpaceFromEnd = newMessageValue.length
        while (newMessageValue[findSpaceFromEnd - 1] === ' ' && findSpaceFromEnd > 10) {
            findSpaceFromEnd--
        }
        newMessageValue = newMessageValue.slice(0, findSpaceFromEnd)
        const block_count = newMessageValue.length / 60
        for (let i = 0; i < block_count; i++) {
            const rightEnd = Math.min((i + 1) * 60, newMessageValue.length)
            const leftEnd = i * 60
            let messageBlock = newMessageValue.substring(leftEnd, rightEnd)
            if (messageBlock[0] === '<' || (messageBlock[0] === '/' && messageBlock !== "/link" && messageBlock !== "/rand" && messageBlock !== "/help")) {
                messageBlock = " " + messageBlock
            }
            if (msg_send.value === true) {
                document.getElementById("message").value = messageBlock
                oldSend()
            } else {
                document.getElementById("board").innerHTML = document.getElementById("board").innerHTML +
                    "<div><span style=\"color: #7eef6d\">[SCRIPT] Message: </span>" + messageBlock + "</div>"
                chatScroll()
            }
        }
        document.getElementById("message").value = ""
    }

})()
