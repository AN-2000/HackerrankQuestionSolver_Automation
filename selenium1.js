
//drivers require kre
require("chromedriver")
let swd = require("selenium-webdriver")

//browser instance build kra
let browser = new swd.Builder()
let gCodesElements = [];
let tAreaE = null;
let gcInputBox = null;

//browser select kra and usme tab khola
let tab = browser.forBrowser("chrome").build()

//ek selenium function use kra tab pr ki jake ye website load kro and usne ek promise dediya hume humne use varibale be sabe krlia
let tabWillBeOpened = tab.get("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login")

tabWillBeOpened.then(function () {
    // implicit timeout har baar dusre then ko wait krwata h jb koi element dhunte h and nhi milta h wo
    //ye wala then 
    let findTimeOutP = tab.manage().setTimeouts({
        implicit: 10000
    });
    return findTimeOutP;
})
.then(function(){
    let inputBoxPromise = tab.findElement(swd.By.css("#input-1"));
    let passwordBoxPromise = tab.findElement(swd.By.css("#input-2"));
        return Promise.all([ passwordBoxPromise, inputBoxPromise]);
})
    .then(function(bothBox){
        //xokohew786@bewedfv.com AutomationL temp-mail
        let passwordBox = bothBox[0]
        let inputBox = bothBox[1]
        let passwordWillBeFilled = passwordBox.sendKeys("AutomationL")
        let inputBoxWillBeFilled = inputBox.sendKeys("xokohew786@bewedfv.com")
        return Promise.all([inputBoxWillBeFilled, passwordWillBeFilled]);
    })
    .then(function(){
        let loginBtn = tab.findElement(swd.By.css("button[data-analytics='LoginPassword']"))
        return loginBtn;
    })
    .then(function(loginBtn){
       let loginBtnWillBeClicked =  loginBtn.click()
       return loginBtnWillBeClicked;
    })
    .then(function(){
        let interviewBtnFind = tab.findElement(swd.By.css(".ui-card.ui-layer-3.active-card"));
        return interviewBtnFind;
    })
    .then(function(interviewBtn){
       let interviewBtnWillBeClicked = interviewBtn.click()
       return interviewBtnWillBeClicked;
    })
    .then(function(){
        let warmupBtnFind = tab.findElement(swd.By.css("a[data-attr1='warmup']"));
        return warmupBtnFind;
    })
    .then(function(warmupBtn){
        let warmupBtnWillBeClicked = warmupBtn.click()
        return warmupBtnWillBeClicked;
    }).then(function () {
        // console.log("Reached warm challenges page")
        // selenium
        let allQtag = tab.findElements(swd.By.css("a.js-track-click.challenge-list-item"));
        return allQtag
    }).then(function (alQues) {
        let allQLinkP = alQues.map(function (anchor) {
            return anchor.getAttribute("href");
        })
        let allLinkPromise = Promise.all(allQLinkP);
        return allLinkPromise;
    }).then(function (allQLink) {
        // serial execution of all the promises
        // ??
        let f1Promise = questionSolver(allQLink[0]);
        for (let i = 1; i < allQLink.length; i++) {
            f1Promise = f1Promise.then(function () {
                return questionSolver(allQLink[i])
            })
        }
        let lstQuestWillBeSolvedP = f1Promise;
        return lstQuestWillBeSolvedP;
    }).then(function () {
        console.log("All questions");
    })
    .catch(function (err) {
        console.log(err);
    })




    function questionSolver(url) {
        return new Promise(function (resolve, reject) {
            // logic to solve a question
            let qPageWillBeOpenedP = tab.get(url);
            qPageWillBeOpenedP.then(function () {
            // resolve();
            let EditorButtonWillBeSelected = tab.findElement(swd.By.css("a[data-attr2='Editorial']"))
            return EditorButtonWillBeSelected;
        })
        .then(function(editBtn){
            let editBtnWillBeClicked = editBtn.click()
            return editBtnWillBeClicked;
        })
        .then(function(){
            let lockBtnHandled = handleLockBtn();  //promise return 
            return lockBtnHandled;
        })
        .then(function () {
            let cCodeWillBecopied = copyCode(); //promise A
            return cCodeWillBecopied;
        }).then(function (code) {  //data = Promise A result = code
            let codeWillBepastedP = pasteCode(code);  
            return codeWillBepastedP;
        })
        .then(function(){
            resolve() //Promise -> Pending ->Settled
        })
        .catch(function (err) {
            reject(err);
        })
    })
}


function handleLockBtn(){
    return new Promise(
        
        
        
        function(resolve,reject){


        let lockBtnWillBeFind = tab.findElement(swd.By.css(".editorial-content-locked button"))
        lockBtnWillBeFind
        .then(function(lockBtn){
            let lockBtnWillBeClicked = lockBtn.click()
            return lockBtnWillBeClicked;    
        })
        .then(function(){
            resolve()
        })
        .catch(function(){
            resolve()
        })




         }
    
    
    
    
    )
}

function copyCode() {
    return new Promise(function (resolve, reject) {
        // all name
        let allLangElementP = tab.findElements(swd.By.css(".hackdown-content h3"));
        // get all the code array
        let allcodeEementP = tab.findElements(swd.By.css(".hackdown-content .highlight"));


        let bothArrayP = Promise.all([allLangElementP, allcodeEementP]);

        bothArrayP
            .then(function (bothArrays) {
                let langsElements = bothArrays[0]; //Elements language ke naam (not string)
                gCodesElements = bothArrays[1];
                let allLangTextP = [];
                for (let i = 0; i < langsElements.length; i++) {
                    let cLangP = langsElements[i].getText();
                    allLangTextP.push(cLangP);  //promises for all elements ki string value do
                }
                return Promise.all(allLangTextP);
            })
            .then(function (allLangs) {
                let codeOfCP;
                for (let i = 0; i < allLangs.length; i++) {
                    if (allLangs[i].includes("C++")) {
                        codeOfCP = gCodesElements[i].getText(); // Code milra h , promise lake dera h
                        break;
                    }
                }
                return codeOfCP;
            }).then(function (code) {
                console.log(code)
                resolve(code);
            }).catch(function (err) {
                reject(err);
            })
    });
}

function pasteCode(code) {
    return new Promise(function (resolve, reject) {
        // click on problem tab
        let pTabWillBeSelectedP = tab.findElement(swd.By.css("li#Problem"));
        pTabWillBeSelectedP.then(function (pTab) {
            let pTwillBeClickedP = pTab.click();
            return pTwillBeClickedP
        })
        .then(function () {
            let inputBoxWBeSP = tab.findElement(swd.By.css(".custom-input-checkbox"));
            return inputBoxWBeSP;
        }).then(function (inputBox) {
            let inputbWillBeCP = inputBox.click();
            return inputbWillBeCP;
        }).then(function () {
            let cInputWillBeSelectedP = tab.findElement(swd.By.css(".custominput"));
            return cInputWillBeSelectedP;
        }).then(function (cInputBox) {
            gcInputBox = cInputBox;
            let codeWillBeEnteredP = cInputBox.sendKeys(code);  
            return codeWillBeEnteredP;
        }).then(function () {
            let ctrlAWillBeSendP = gcInputBox.sendKeys(swd.Key.CONTROL + "a");
            return ctrlAWillBeSendP;
        }).then(function () {
            let ctrlXWillBeSendP = gcInputBox.sendKeys(swd.Key.CONTROL + "x");
            return ctrlXWillBeSendP;
        })
        .then(function () {
            let tAreaP = tab.findElement(swd.By.css("textarea"));
            return tAreaP;
        }).
        then(function(tArea){
            tAreaE = tArea;
            let pSelectAll = tArea.sendKeys(swd.Key.CONTROL + "a");
            return pSelectAll;
        })
        .then(function(){
            let pDelete = tAreaE.sendKeys(swd.Key.BACK_SPACE);
            return  pDelete
        })
        .then(function(){
            let pPaste = tAreaE.sendKeys(swd.Key.CONTROL + "v");
            return pPaste;

        })
        .then(function () {
            let submitCodeBtnWillBeS = tab.findElement(swd.By.css("button.hr-monaco-submit"));
            return submitCodeBtnWillBeS;
        }).then(function (submitBtn) {
            let submitBtnWillBeClickedP = submitBtn.click();
            return submitBtnWillBeClickedP;
        })
        .then(function () {
            resolve();
        }).catch(function (err) {
            reject(err);
        })
        // write the code 
        // submit the code 
    })
}