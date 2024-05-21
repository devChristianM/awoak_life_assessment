// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import wixData from "wix-data";
import { currentMember } from 'wix-members';
import wixLocation from 'wix-location';
const labelsList = [
    'Health, Fitness & Energy Levels', 'Environment & Living Space', 'Emotional Mastery & Evolution', 'Purpose & Fulfillment', 'Spiritual Life & Manifestation', 'Love, Relationship & Family',
    'Community & Friends', 'Successful Career / Business', 'Financial Independence', 'Relationship With Myself', 'Relationship With Others', 'Quality Of Life & Excitement'
];
const alignResults = [];
const alignAVG = [];
const alignDates = [];
const realityImpSessions = [];
const realityTimeSessions = [];
const workSessions = [];
const dontWorkSessions = [];

async function generateGraphs() {
    //DATABASE QUERIES
    const user = await currentMember.getMember(); //{ fieldsets: ['PUBLIC'] }
    
    const alignProm = wixData.query('AlignmentAssessment')
        .startsWith('id_reference', user._id)
        .find();

    const realityDataProm = wixData.query('RealityCheck')
        .startsWith('id_reference', user._id)
        .find();

    const workDataProm = wixData.query('WorkDontWork')
        .startsWith('id_reference', user._id)
        .find();

    const alignData = await alignProm
        .then(result => {
            result.items.forEach(e => {
                let sessionRes = [];
                for (let j = 0; j <= 11; j++) {
                    sessionRes.push(e[`fla${j}`]);
                }
                alignAVG.push(e.flaAverage);
                alignDates.push(Intl.DateTimeFormat('en-GB').format(e._createdDate))
                alignResults.push(sessionRes);
            })
        })
        .catch((err) => {
            console.error("There was an error", err)
        });
    const realityData = await realityDataProm
        .then((result) => {
            result.items.forEach(e => {
                const impSessionValues = [];
                const timeSessionValues = [];
                for (let i = 0; i <= 11; i++) {
                    impSessionValues.push(e[`importance${i}`]);
                    timeSessionValues.push(e[`time${i}`]);
                }
                realityImpSessions.push(impSessionValues);
                realityTimeSessions.push(timeSessionValues);
            })
        })
        .catch((err) => {
            console.error("There was an error", err)
        });
    const workData = await workDataProm
        .then((result) => {
            result.items.forEach(e => {
                const workSessionValues = []
                const dontWorkSessionValues = [];
                for (let i = 0; i < 5; i++) {
                    workSessionValues.push(e[`work${i}`]);
                    dontWorkSessionValues.push(e[`notWork${i}`]);
                }
                workSessions.push(workSessionValues);
                dontWorkSessions.push(dontWorkSessionValues);
            })
        })
    //console.log("DATES", alignDates, "IMP", realityImpSessions, "TIME", realityTimeSessions);

    // ON READY FUNCTION
    $w.onReady(function () {
        console.log("PAGE READY");   
        //CREATING DROP-DOWNS
        const dateOptions = [];
        alignDates.forEach((e, i) => {
            dateOptions.push({ "label": e, "value": String(i) });
        });
        //ALIGN DROP-DOWNS
        $w('#dropAlignSession').options = dateOptions;
        $w('#dropAlignSession').placeholder = alignDates[0];
        $w('#dropAlignSession').onChange(e => {
            let index = e.target.value;
            $w('#dashAlignWheel').postMessage(alignResults[index]);
        });

        //REALITY DROP-DOWNS
        $w('#dropRealSession').options = dateOptions;
        $w('#dropRealSession').placeholder = alignDates[0];
        $w('#dropRealSession').onChange(e => {
            let index = e.target.value;
            $w('#dashRealityCheck').postMessage([realityImpSessions[index], realityTimeSessions[index]]);
        });
        const realOptions = [];
        labelsList.forEach((e, i) => {
            realOptions.push({ "label": e, "value": String(i) })
        })
        $w('#dropRealOverTime').options = realOptions;
        $w('#dropRealOverTime').placeholder = labelsList[0];
        if (realityImpSessions.length > 0) {
            $w('#dropRealOverTime').onChange(e => {
                const result = [];
                let index = e.target.value;
                result.push(
                    realityImpSessions.map(e => {
                        return e[index]
                    }));
                result.push(realityTimeSessions.map(e => {
                    return e[index]
                }));
                $w('#dashRealOverTime').postMessage([result, alignDates]);
            });
        }
    });
    //SENDING DATA TO THE GRAPHS
    if (alignAVG.length < 1) {
            $w('#textHappinessFactor').text = '0';
        } else {
            $w('#textHappinessFactor').text = String(alignAVG[0]);
        }
        if (alignResults.length > 0 && realityImpSessions.length > 0 && realityTimeSessions.length > 0) {
            $w('#dashAlignWheel').postMessage(alignResults[0]);
            $w("#dashAlignOverTime").postMessage([alignAVG, alignDates]);
            $w('#dashRealityCheck').postMessage([realityImpSessions[0], realityTimeSessions[0]]);
            const res = [];
            res.push(
                realityImpSessions.map(e => {
                    return e[0]
                }));
            res.push(realityTimeSessions.map(e => {
                return e[0]
            }));
            $w('#dashRealOverTime').postMessage([res, alignDates]);

            $w('#btnPrintReport').onClick(e => {
                wixLocation.to('https://www.awoaklife.com/report-test');
            });
        } else {
            console.log('No tests taken');
            $w('#btnPrintReport').onClick(e => {
                $w('#textNoTestTaken').show('fade', {
                    "duration": 600,
                    "delay": 0
                });
                setTimeout(() => {
                    $w('#textNoTestTaken').hide('fade', {
                        "duration": 600,
                        "delay": 0
                    });
                }, 2500);
            })
        }
}
generateGraphs();
