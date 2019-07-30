/*This file contains logics for common functionalites used.*/
/**
* This function is used to remove bet from bet replacement.
* @param {val} removeBetParams
*/
export function removeBet(removeBetParams) {
    let topBetsData = removeBetParams.totalBets;
    let top5Bets = removeBetParams.showBetsData;
    let top5BetsId = removeBetParams.top5BetsId;
    let removeIndex = -1;
    topBetsData.filter(function (item, index) {
        if (item.MEID === removeBetParams.MEID) {
            removeIndex = index;
        }
        return removeIndex;
    })
    topBetsData[removeIndex]['isRemoved'] = true;
    topBetsData[removeIndex]['isRemoveDat'] = new Date();
    let nextBet = {};
    for (let i = 5; i < topBetsData.length; i++) {
        if (topBetsData[i]["isRemoved"] === false && top5BetsId.indexOf(topBetsData[i]["MEID"]) < 0) {
            nextBet = topBetsData[i];
            top5BetsId.splice(top5BetsId.indexOf(removeBetParams.MEID), 1, nextBet.MEID)
            if (removeBetParams.id === "bestBets") {
                let d = document.getElementById("arrow_" + removeBetParams.index);
                d.className += " animated slideOutLeft";
                break;
            } else {
                let d = document.getElementById("popular_" + removeBetParams.index);
                d.className += " animated slideOutLeft";
                break;
            }
        }
    }
    if (Object.keys(nextBet).length > 0) {
    nextBet.isNextBet = true;
    top5Bets[removeBetParams.index] = nextBet;
    } else {
    let nextBet = {};
    let nextBetInd = -1
    for (let j = 0; j < topBetsData.length; j++) {
        if (topBetsData[j]["isRemoved"] && topBetsData[j]["MEID"] !== removeBetParams.MEID) {
            if (Object.keys(nextBet).length > 0) {
                if (nextBet.isRemoveDat > topBetsData[j]["isRemoveDat"]) {
                    nextBet = topBetsData[j];
                    nextBetInd = j;
                }
            } else {
                nextBet = topBetsData[j];
                nextBetInd = j;
            }
        }    
        if (removeBetParams.id === "bestBets"){
            let d1 = document.getElementById("arrow_" + removeBetParams.index);
            d1.className += " animated slideOutLeft";
        } else {
            let d1 = document.getElementById("popular_" + removeBetParams.index);
            d1.className += " animated slideOutLeft";
        }
    }
    if (Object.keys(nextBet).length > 0 && nextBetInd > -1) {
        nextBet.isNextBet = true;
        nextBet.isRemoved = false;
        nextBet.isRemoveDat = ''
        topBetsData[nextBetInd]["isRemoved"] = false;
        topBetsData[nextBetInd]["isRemoveDat"] = '';
        top5Bets[removeBetParams.index] = nextBet
        top5BetsId.splice(top5BetsId.indexOf(removeBetParams.MEID), 1, nextBet.MEID)
                
    }
           
    }
    setTimeout(function () {
        if (removeBetParams.id === "bestBets") {
            let d = document.getElementById("arrow_" + removeBetParams.index);
            d.className -= " animated slideOutLeft";
            d.className += " BLSBT-matchBox";
        }
        else {
            let d = document.getElementById("popular_" + removeBetParams.index);
            d.className -= " animated slideOutLeft";
            d.className += " BLSBT-matchBox";
        }          
    }, 800)   
    let oddsMultiply = 1;
    for (let i = 0; i < 5; i++) {
        oddsMultiply = oddsMultiply * removeBetParams.showBetsData[i].odds;
    }
    return oddsMultiply;
      }

/**
    * This function is used to add individual bet to betslip
    * @param {any} item
*/
export function addToBetslip(item) {
    if (window.BetSlipUtil) {
    window.BetSlipUtil.addOddToSlip(item.MEID, item.eventId, item.lineID, item.odds, item.lineGroupID, item.lineTypeID, item.rowTypeID, item.points, item.isLive, item.isQA, item.marketId, item.sbLeagueid, item.betId);
    }
}
    /**
     * This function is used to change the languages.
     */
export function findLanguage() {
    if (window.LangID != null && window.LangID != "") {
        return window.LanguageItemCache.Items[window.LangID]['Code'];
    } else {
        let lang;
        lang = getQueryVariable('lang');
        if (lang && lang !== '') {
            return lang;
        } else {
            return 'en';
        }
    }
}
export function getQueryVariable(variable) {
    const query = window.location.search.substring(1);
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        if (pair[0] === variable) {
            return pair[1];
        }
    }
}
export function goToEvent(item, index,isLive) {
    if (window.Application) {
        if (isLive === false) {
            window.Application.OpenGame(item.match, item.MEID, item.isLive, "0", false, "1")
        } else {
            window.Application.OpenGame(item.eventName, item.MEID, item.isLive, "1", false, "1")
        }
    }
}