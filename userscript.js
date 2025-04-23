// ==UserScript==
// @name         CardRecordPROMAX
// @namespace    http://tampermonkey.net/
// @version      2025-04-15
// @description  not an AD reference
// @author       6361
// @match        *://ruarua.ru/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        unsafeWindow
// ==/UserScript==

(function () {
    'use strict'

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
        console.log("Get back mult not found!")
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
    function craftConvert(rar) {
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
        console.log("Rarity not found!")
        return 0
    }
    function convertCraft(num) {
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
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
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
        if (testRarity < 3) {
            return false
        }
        if (testID === 33 && testRarity < 3) {
            return false
        }
        if (testID === 34 && testRarity === 2) {
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
            console.log("Not dicing!")
            return
        }
        if (/33/.test(document.getElementById("1").value) === false) {
            console.log("Not dicing!")
            return
        }
        console.log("Dicing...")
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
        console.log("Dice ended")
    }
    async function singleDice(value) {
        if (unsafeWindow.location.pathname.startsWith("/e/npc") === false && unsafeWindow.location.pathname.startsWith("/npc") === false) {
            console.log("Not dicing!")
            return
        }
        if (/33/.test(document.getElementById("1").value) === false) {
            console.log("Not dicing!")
            return
        }
        console.log("Dicing single dice...")
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
        console.log("Dice ended")
    }
    let goCraft = false
    async function allCraft() {
        if (unsafeWindow.location.pathname.startsWith("/e/craftcard") === false && unsafeWindow.location.pathname.startsWith("/craftcard") === false) {
            console.log("Not crafting!")
            return
        }
        console.log("Crafting...")
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
        console.log("Craft ended")
    }
    async function singleCraft(value) {
        if (unsafeWindow.location.pathname.startsWith("/e/craftcard") === false && unsafeWindow.location.pathname.startsWith("/craftcard") === false) {
            console.log("Not crafting!")
            return
        }
        console.log("Crafting single card...")
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
        console.log("Craft ended")
    }
    const oldSend = unsafeWindow.send
    unsafeWindow.send = function () {
        const messageValue = document.getElementById("message").value
        let newMessageValue = messageValue
        newMessageValue = newMessageValue.replaceAll(/(?<!\s)(?!\s{2}\S)\s+/g, "  ")
        //使用方法：.rep on或者.rep off，可以替换一些输入的文本
        if (newMessageValue.slice(0, 5) === ".rep ") {
            newMessageValue = newMessageValue.slice(6)
            if (newMessageValue.slice(0, 2) === "on") {
                console.log("Replace is on")
                com_rep.value = true
            }
            if (newMessageValue.slice(0, 3) === "off") {
                console.log("Replace is off")
                com_rep.value = false
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
                console.log("Already started PFLF!")
                newMessageValue = ""
            } else {
                console.log("PFLF started!")
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
                console.log("PFLF is not started!")
            } else {
                console.log("PFLF ended!")
                PFLFstart.value = false
            }
            newMessageValue = ""
            document.getElementById("message").value = newMessageValue
        }
        if (newMessageValue === ".getPFLF") {
            if (PFLFstart.value === false) {
                console.log("PFLF is not started!")
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
                console.log("PFLF is not started!")
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
                    console.log("Error! Can not claim the number")
                    newMessageValue = ""
                }
            }
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.PFLFset limit8或者limit9,roll3,roll4，修改PFLF的上限或每回合的新数
        if (newMessageValue.slice(0, 9) === ".PFLFset ") {
            newMessageValue = newMessageValue.slice(10)
            if (newMessageValue.slice(0, 6) === "limit8") {
                console.log("Limit is set to 8")
                PFLFlimit.value = 8
            }
            if (newMessageValue.slice(0, 6) === "limit9") {
                console.log("Limit is set to 9")
                PFLFlimit.value = 9
            }
            if (newMessageValue.slice(0, 5) === "roll3") {
                console.log("Roll is set to 3")
                PFLFroll.value = 3
            }
            if (newMessageValue.slice(0, 5) === "roll4") {
                console.log("Roll is set to 4")
                PFLFroll.value = 4
            }
            newMessageValue = ""
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.1A2Bstart，可以开启1A2B
        if (newMessageValue === ".1A2Bstart") {
            if (check1A2B(Num1A2B.value) === true) {
                console.log("Already started 1A2B!")
                newMessageValue = ""
            } else {
                console.log("Generating 1A2B number...")
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
                console.log("1A2B is not started!")
            } else {
                console.log("1A2B ended! The number is " + Num1A2B.value)
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
                console.log("1A2B is not started!")
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
                    console.log("Invalid guess!")
                    newMessageValue = ""
                }
            }
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.send，开启消息发送（这条消息不会被发送）
        if (newMessageValue === ".send") {
            console.log("Send message is activated!")
            msg_send.value = true
            newMessageValue = ""
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.unsend，关闭消息发送
        if (newMessageValue === ".unsend") {
            console.log("Send message is inactivated!")
            msg_send.value = false
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
                console.log("Invalid parameter!")
                newMessageValue = ""
            } else {
                console.log("Craft state modified!")
                let testArray = craftAtt.value
                let checkValue = testArray[craftConvert(testAdd1[0])][parseInt(testAdd2[0], 10)]
                testArray[craftConvert(testAdd1[0])][parseInt(testAdd2[0], 10)] = "" + (parseInt(checkValue.match(/^\d+/)[0], 10) + parseInt(testAdd2[1], 10)) + "/" + (parseInt(checkValue.match(/(?<=\/)\d+/)[0], 10) + parseInt(testAdd2[2], 10))
                craftAtt.value = testArray
                newMessageValue = ".craftstate  " + testAdd1
            }
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.endcraft，结束正在进行的craft
        if (newMessageValue === ".endcraft") {
            console.log("Ending craft...")
            goCraft = false
            newMessageValue = ""
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.craftstate，查看所有稀有度合成数据
        if (newMessageValue === ".craftstate") {
            for (let i = 1; i <= 6; i++) {
                let testArray = craftAtt.value
                let testStr = "Rarity: " + convertCraft(i)
                if (parseInt(testArray[i][0].match(/^\d+/)[0], 10) !== 0) {
                    testStr = testStr + "\nYou have a failing streak of " + parseInt(testArray[i][0].match(/^\d+/)[0], 10) + " craft"
                    if (parseInt(testArray[i][0].match(/^\d+/)[0], 10) !== 1) {
                        testStr = testStr + "s"
                    }
                }
                if (parseInt(testArray[i][0].match(/(?<=\/)\d+/)[0], 10) !== 0) {
                    testStr = testStr + "\nYou have a successing streak of " + parseInt(testArray[i][0].match(/(?<=\/)\d+/)[0], 10) + " craft"
                    if (parseInt(testArray[i][0].match(/(?<=\/)\d+/)[0], 10) !== 1) {
                        testStr = testStr + "s"
                    }
                }
                if (testStr.match("You") == null) {
                    testStr = testStr + "\nYou have no craft records at this rarity yet"
                }
                for (let j = 1; j <= 100; j++) {
                    if (parseInt(testArray[i][j].match(/(?<=\/)\d+/)[0], 10) !== 0) {
                        testStr = testStr + "\nAtt " + j + ": " + testArray[i][j]
                    }
                }
                console.log(testStr)
            }
            newMessageValue = ""
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.craftstate rarity（rarity可以是数字也可以是区分大小写的稀有度），查看该稀有度合成数据
        if (newMessageValue.slice(0, 12) === ".craftstate ") {
            newMessageValue = newMessageValue.slice(13)
            let testRarity = newMessageValue.match(/^\d+/)
            if (testRarity === null && newMessageValue.match(/^[A-Za-z]+/) !== null) {
                testRarity = craftConvert(newMessageValue.match(/^[A-Za-z]+/)[0])
            } else {
                testRarity = parseInt(testRarity, 10)
            }
            if (testRarity === null || testRarity < 1 || testRarity > 6) {
                console.log("Invalid parameter!")
            } else {
                let testArray = craftAtt.value
                let testStr = "Rarity: " + convertCraft(testRarity)
                if (parseInt(testArray[testRarity][0].match(/^\d+/)[0], 10) !== 0) {
                    testStr = testStr + "\nYou have a failing streak of " + parseInt(testArray[testRarity][0].match(/^\d+/)[0], 10) + " craft"
                    if (parseInt(testArray[testRarity][0].match(/^\d+/)[0], 10) !== 1) {
                        testStr = testStr + "s"
                    }
                }
                if (parseInt(testArray[testRarity][0].match(/(?<=\/)\d+/)[0], 10) !== 0) {
                    testStr = testStr + "\nYou have a successing streak of " + parseInt(testArray[testRarity][0].match(/(?<=\/)\d+/)[0], 10) + " craft"
                    if (parseInt(testArray[testRarity][0].match(/(?<=\/)\d+/)[0], 10) !== 1) {
                        testStr = testStr + "s"
                    }
                }
                if (testStr.match("You") == null) {
                    testStr = testStr + "\nYou have no craft records at this rarity yet"
                }
                for (let i = 1; i <= 100; i++) {
                    if (parseInt(testArray[testRarity][i].match(/(?<=\/)\d+/)[0], 10) !== 0) {
                        testStr = testStr + "\nAtt " + i + ": " + testArray[testRarity][i]
                    }
                }
                console.log(testStr)
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
            console.log("Cleared craft result!")
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
                console.log("Invalid parameter!")
                newMessageValue = ""
            } else {
                console.log("Dicer state modified!")
                let testArray = dicerResult.value
                testArray[dicerConvert(parseInt(testAdd1[0], 10))] += parseInt(testAdd2[0], 10)
                dicerResult.value = testArray
                newMessageValue = ".dicestate"
            }
            document.getElementById("message").value = newMessageValue
        }
        //使用方法：.dice，结束正在进行的dicer
        if (newMessageValue === ".enddice") {
            console.log("Ending dice...")
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
                        testStr += "\n"
                    }
                }
            }
            console.log(testStr)
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
            console.log("Cleared dicer result!")
            newMessageValue = ""
            document.getElementById("message").value = newMessageValue
        }
        if (newMessageValue[0] === ".") {
            console.log("Command does not exist!")
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
        newMessageValue = newMessageValue.replaceAll("kys", "k.y.s")
        newMessageValue = newMessageValue.replaceAll("nm", "n.m")
        newMessageValue = newMessageValue.replaceAll("rz", "r.z")
        newMessageValue = newMessageValue.replaceAll(/s\s?b/g, "s..b")
        newMessageValue = newMessageValue.replaceAll("stfu", "s.t.f.u")
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
            console.log(messageBlock)
            document.getElementById("message").value = messageBlock
            if (msg_send.value === true) {
                oldSend()
            }
        }
    }

})()