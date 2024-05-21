// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import { authentication, currentMember } from 'wix-members';
import wixWindow from 'wix-window';
import wixData from "wix-data";
import wixLocation from 'wix-location';
const labelsList = [
    'Health, Fitness & Energy Levels', 'Environment & Living Space', 'Emotional Mastery & Evolution', 'Purpose & Fulfillment', 'Spiritual Life & Manifestation', 'Love, Relationship & Family',
    'Community & Friends', 'Successful Career / Business', 'Financial Independence', 'Relationship W. Myself', 'Relationship W. Others', 'Quality Of Life & Excitement'
];
const importanceBtnIDs = ["#btnChooseImp0", "#btnChooseImp1", "#btnChooseImp2", "#btnChooseImp3", "#btnChooseImp4", "#btnChooseImp5", "#btnChooseImp6", "#btnChooseImp7", "#btnChooseImp8", "#btnChooseImp9", "#btnChooseImp10", "#btnChooseImp11"];
const orderedImpBtnIDs = ["#btnImpOrder0", "#btnImpOrder1", "#btnImpOrder2", "#btnImpOrder3", "#btnImpOrder4", "#btnImpOrder5", "#btnImpOrder6", "#btnImpOrder7", "#btnImpOrder8", "#btnImpOrder9", "#btnImpOrder10", "#btnImpOrder11"];
const impOrderedList = [];
const timeBtnIDs = ["#btnChooseTime0", "#btnChooseTime1", "#btnChooseTime2", "#btnChooseTime3", "#btnChooseTime4", "#btnChooseTime5", "#btnChooseTime6", "#btnChooseTime7", "#btnChooseTime8", "#btnChooseTime9", "#btnChooseTime10", "#btnChooseTime11"];
const orderedTimeBtnIDs = ["#btnTimeOrder0", "#btnTimeOrder1", "#btnTimeOrder2", "#btnTimeOrder3", "#btnTimeOrder4", "#btnTimeOrder5", "#btnTimeOrder6", "#btnTimeOrder7", "#btnTimeOrder8", "#btnTimeOrder9", "#btnTimeOrder10", "#btnTimeOrder11"];
const timeOrderedList = [];
const workList = [];
const dontWorkList = [];
const alignResult = {};
const importanceTimeResult = {};
const writeDownResult = {};
let counter = 0;

function errorMsgFadeIn(txt) {
    $w(txt).show("fade", {
        "duration": 600,
        "delay": 0
    });
    setTimeout(() => {
        $w(txt).hide("fade");
    }, 3000);
}

$w.onReady(function () {
    console.log('PAGE READY')
    // FIRST EXERCISE
    $w('#sendAlign').onClick((event) => {
        const sliders = $w('Slider');
        const values = sliders.map(e => e.value);
        const avrg = (values.reduce((a, b) => a + b)) / values.length;
        values.forEach((e, i) => alignResult[`fla${i}`] = e);
        alignResult.flaAverage = Number(avrg.toFixed(1));
        //console.log("Alignment results", alignResult);
        $w("#section1").hide();
        $w('#anchor1').scrollTo()
            .then(() => {
                $w("#section2").expand();
                $w("#section1").collapse();
            })
    });
    // SECOND EXERCISE - IMPORTANCE
    importanceBtnIDs.forEach((e, i) => {
        $w(e).onClick(() => {
            if ($w(e).enabled) {
                $w(`#btnImpOrder${counter}`).label = $w(e).label;
                impOrderedList.push([$w(e).label, i]);
                counter += 1;
                $w(e).disable();
            }
        })
    });
    // UPDATE FUNCTION
    function updateImpList() {
        impOrderedList.forEach((e, i) => {
            $w(`#btnImpOrder${impOrderedList.length}`).label = '';
            $w(`#btnImpOrder${i}`).label = e[0];

        })
    }
    orderedImpBtnIDs.forEach((e, i) => {
        $w(e).onClick(() => {
            if ($w(e).label !== '') {
                const index = i;
                $w(`#btnChooseImp${impOrderedList[index][1]}`).enable();
                $w(e).label = '';
                counter -= 1;
                impOrderedList.splice(index, 1);
                updateImpList();
            }
        })
    })
    $w("#sendImportance").onClick(() => {
        if (impOrderedList.length === 12) {
            impOrderedList.reverse();
            const orderedList = [];
            impOrderedList.forEach(e => orderedList.push(e[0]));
            labelsList.forEach((e, i) => { importanceTimeResult[`importance${i}`] = (orderedList.indexOf(e)) + 1 });
            counter = 0;
            console.log("Reality check Results", importanceTimeResult);
            $w("#section2").hide();
            $w('#anchor2').scrollTo()
                .then(() => {
                    $w("#section3").expand();
                    $w("#section2").collapse();
                })
        } else {
            //prompt something
            errorMsgFadeIn('#textErrorImp')
        }
    });
    //SECOND EXERCISE - TIME SPENT
    timeBtnIDs.forEach((e, i) => {
        $w(e).onClick(() => {
            if ($w(e).enabled) {
                $w(`#btnTimeOrder${counter}`).label = $w(e).label;
                timeOrderedList.push([$w(e).label, i]);
                counter += 1;
                $w(e).disable();
            }
        })
    });
    // UPDATE FUNCTION
    function updateTimeList() {
        timeOrderedList.forEach((e, i) => {
            $w(`#btnTimeOrder${timeOrderedList.length}`).label = '';
            $w(`#btnTimeOrder${i}`).label = e[0];

        })
    }
    orderedTimeBtnIDs.forEach((e, i) => {
        $w(e).onClick(() => {
            if ($w(e).label !== '') {
                const index = i;
                $w(`#btnChooseTime${timeOrderedList[index][1]}`).enable();
                $w(e).label = '';
                counter -= 1;
                timeOrderedList.splice(index, 1);
                updateTimeList();
            }
        })
    })
    $w("#sendTimeSpent").onClick(() => {
        if (timeOrderedList.length === 12) {
            //timeOrderedList.forEach((e, i) => importanceTimeResult[`time${i}`] = e[0])
            timeOrderedList.reverse();
            const orderedList = [];
            timeOrderedList.forEach(e => orderedList.push(e[0]));
            labelsList.forEach((e, i) => { importanceTimeResult[`time${i}`] = (orderedList.indexOf(e)) + 1 });
            counter = 0;
            console.log("Reality check Results", importanceTimeResult);
            $w("#section3").hide();
            $w('#anchor3').scrollTo()
                .then(() => {
                    $w("#section4").expand();
                    $w("#section3").collapse();
                })
        } else {
            //prompt something
            errorMsgFadeIn('#textErrorTime')
        }
    });
    // THIRD EXERCISE
    // PART1
    $w('#sendWhatWorks').onClick(() => {
        for (let i = 0; i < 5; i++) {
            let work = $w(`#inputWhatWorks${i}`).value;
            if (work.trim() !== '') {
                writeDownResult[`work${i}`] = work;
            } else {
                errorMsgFadeIn('#textErrorWorking');
                break
            }
        }
        if (Object.keys(writeDownResult).length === 5) {
            $w("#section4").hide();
            $w('#anchor4').scrollTo()
                .then(() => {
                    $w("#section5").expand();
                    $w("#section4").collapse();
                })
        }

    })
    // PART2

    // SAVE AND REGISTRATION/LOGIN
    $w('#saveResultButton').onClick(() => {
        // Check for Exercise 3 part 2
        for (let i = 0; i < 5; i++) {
            let work = $w(`#inputDntWork${i}`).value;
            if (work.trim() !== '') {
                writeDownResult[`notWork${i}`] = work;
            } else {
                errorMsgFadeIn('#textErrorStruggle');
                break
            }
        }
        if (Object.keys(writeDownResult).length === 10) {
            const isLoggedIn = authentication.loggedIn();
            if (isLoggedIn) {
                console.log('Member is logged in');
                console.log("Final Results", alignResult, importanceTimeResult, writeDownResult)
                return currentMember.getMember({ fieldsets: ['PUBLIC'] })
                    .then((member) => {
                        alignResult.id_reference = member._id;
                        wixData.insert("AlignmentAssessment", alignResult);
                            
                        importanceTimeResult.id_reference = member._id;
                        wixData.insert("RealityCheck", importanceTimeResult);
                            
                        writeDownResult.id_reference = member._id;
                        wixData.insert("WorkDontWork", writeDownResult);
                            
                        wixLocation.to("https://www.awoaklife.com/account/Report");
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                console.log('Member is not logged in');
                const dataToSend = {
                    "align": alignResult,
                    "reality": importanceTimeResult,
                    "work": writeDownResult
                };
                wixWindow.openLightbox("Subscribe (Alignment Assessment)", dataToSend);
            }
        }

    });
});