var probData;
var probNum;
var tryNum;
var viewFrontExpectNum;
var viewBackExpectNum;
var minFrontExpectNum;
var maxBackExpectNum;
var distanceNum;
var viewPercent = false;


function initNumVal() {
    var realProbNum = Number(document.getElementById("probNum").value)
    probNum = realProbNum / 100.0
    document.getElementById("probNum").value = Number(realProbNum.toFixed(3));

    tryNum = Number(document.getElementById("tryNum").value)
    viewBackExpectNum = Number(document.getElementById("backExpectNum").value)
    viewFrontExpectNum = Number(document.getElementById("frontExpectNum").value)
    distanceNum = Number(document.getElementById("frontExpectNum").value)
}

var barChartData;

var chartColor = Chart.helpers.color;
var myChart;
var ctx = document.getElementById('canvas').getContext('2d');

chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

init();


function init() {
    initNumVal()

    probData = calcurateProbValues(probNum, tryNum)

    var fbValObj = getFrontBackVal(probData)
    viewBackExpectNum = fbValObj.backSetNum
    viewFrontExpectNum = fbValObj.frontSetNum

    barChartData = {
        labels: range(fbValObj.frontSetNum, fbValObj.backSetNum),
        datasets: [{
            backgroundColor: chartColor(chartColors.blue).alpha(0.5).rgbString(),
            borderColor: chartColors.blue,
            borderWidth: 1,
            data: fbValObj.sliceArrayData
        }]
    };

    chartOpt = setChartOption();
    myChart = new Chart(ctx, chartOpt);

    distanceNum = fbValObj.frontSetNum;
    minFrontExpectNum = fbValObj.frontSetNum - distanceNum
    maxBackExpectNum = math.min(fbValObj.backSetNum + distanceNum, tryNum);

    modifyDataTitle()

    var viewVal = $('#viewValueOnGraph').is(':checked')
    getToggle(viewVal)
}

function modifyDataTitle() {
    // document.getElementById("chartTitle").innerText = '확률 : ' + Number((probNum * 100).toFixed(3)) + '% , ' + tryNum + '회 시행';
    myChart.options.title.text = '확률 : ' + Number((probNum * 100).toFixed(3)) + '% , ' + tryNum + '회 시행';
}

function setChartOption() {
    var opt = {
        type: 'bar',
        data: barChartData,
        options: {
            responsive: true,
            legend: {
                // position: 'top',
                display: false
            },
            title: {
                display: true,
                fontColor: '#000000',
                fontSize: 15,
                // text: '확률 : ' + Number((probNum * 100).toFixed(3)) + '% , ' + tryNum + '회 시행'
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: '확률'
                    },
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values) {
                            return value + '%';
                        }
                    }
                }],
                // xAxes: [{
                // 	scaleLabel: {
                // 		display: true,
                // 		labelString: '갯수'
                // 	},
                // }]
            },
            tooltips: {
                // Disable the on-canvas tooltip
                // enabled: true,
                displayColors: false,
                titleAlign: 'center',
                bodyAlign: 'center',
                callbacks: {
                    // title: function () { },
                    label: function (tooltipItem) {
                        return Number(tooltipItem.yLabel) + "%";
                    },
                },
            },
            hover: {
                animationDuration: 0
            },
            animation: {
                // duration: 0,
                onComplete: function () {
                    if (viewPercent == true) {
                        var chartInstance = this.chart,
                            ctx = chartInstance.ctx;
                        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize,
                            Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';

                        this.data.datasets.forEach(function (dataset, i) {
                            var meta = chartInstance.controller.getDatasetMeta(i);
                            meta.data.forEach(function (bar, index) {
                                var data = dataset.data[index];
                                if (data > 0) {
                                    ctx.fillText(data + "%", bar._model.x, bar._model.y - 5);
                                }
                            });
                        });
                    }

                }
            }
        }
    }

    return opt
}

function calcurateProbValues(probNum, tryNum) {
    var dataList = Array.from({length: tryNum + 1}, () => 0);
    var zeroOverChk = false;

    if (probNum <= 0.5) {
        for (var i = 0; i <= tryNum; i++) {
            var res = cals(probNum, tryNum, i)

            if(res > 0) {
                dataList[i] = res;
            }

            if(zeroOverChk == false && res > 0) {
                zeroOverChk = true;
            }

            if(zeroOverChk == true && res <= 0) {
                break;
            }
        }
    }
    else {
        for (var i = tryNum; i >= 0; i--) {
            var res = cals(probNum, tryNum, i)

            if(res > 0) {
                dataList[i] = res;
            }

            if(zeroOverChk == false && res > 0) {
                zeroOverChk = true;
            }

            if(zeroOverChk == true && res <= 0) {
                break;
            }
        }
    }
    return dataList;
}

function cals(probNum, tryNum, i) {
    var comb = math.bignumber(math.combinations(math.bignumber(tryNum), math.bignumber(i)));
    var p = math.pow(math.bignumber(probNum), math.bignumber(i));
    var q = math.pow(math.bignumber(1.0 - probNum), math.bignumber(tryNum - i));

    var res = math.bignumber(comb * p * q * 100);

    res = Number(res.toFixed(3));

    if (isFinite(res) == false) {
        res = 0;
    }

    return res
}

function range(start, end) {
    var foo = [];
    for (var i = start; i <= end; i++) {
        foo.push(i);
    }
    return foo;
}

function mainInputUpdate() {
    initNumVal();

    probData = calcurateProbValues(probNum, tryNum)

    var fbValObj = getFrontBackVal(probData);


    var sliceLabel = range(fbValObj.frontSetNum, fbValObj.backSetNum);
    barChartData.labels = sliceLabel;
    viewFrontExpectNum = fbValObj.frontSetNum;
    viewBackExpectNum = fbValObj.backSetNum;

    myChart.data.datasets[0].data = fbValObj.sliceArrayData

    myChart.update();

    distanceNum = fbValObj.frontSetNum;
    minFrontExpectNum = fbValObj.frontSetNum - distanceNum;
    maxBackExpectNum = math.min(fbValObj.backSetNum + distanceNum, tryNum);

    modifyDataTitle();
}

function getFrontBackVal(dataArray) {
    var highestVal = Math.max(...dataArray);
    var highestIndex = dataArray.indexOf(highestVal)

    var arrFront = dataArray.slice(0, highestIndex)
    var arrBack = dataArray.slice(highestIndex)

    var frontZeroIndex = arrFront.lastIndexOf(0)
    var backZeroIndex = arrBack.indexOf(0)

    if (frontZeroIndex != -1) {
        var frontSetNum = frontZeroIndex
    }
    else if (frontZeroIndex == -1) {
        var frontSetNum = 0
    }
    document.getElementById("frontExpectNum").value = frontSetNum

    if (backZeroIndex != -1) {
        var backSetNum = highestIndex + backZeroIndex
    }
    else if (backZeroIndex == -1) {
        var backSetNum = dataArray.length - 1
    }
    document.getElementById("backExpectNum").value = backSetNum

    var sliceArrayData = dataArray.slice(frontSetNum, backSetNum + 1)

    var resObj = {
        frontZeroIndex: frontZeroIndex,
        backZeroIndex: backZeroIndex,
        frontSetNum: frontSetNum,
        backSetNum: backSetNum,
        sliceArrayData: sliceArrayData
    }

    return resObj
}

function frontExpectUpdate() {
    var frontExpectNum = Number(document.getElementById("frontExpectNum").value)
    var backExpectNum = Number(document.getElementById("backExpectNum").value)

    frontExpectNum = chkNumRange(frontExpectNum, minFrontExpectNum, viewBackExpectNum)
    
    if (frontExpectNum < backExpectNum) {
        document.getElementById("frontExpectNum").value = frontExpectNum
    }
    else {
        document.getElementById("frontExpectNum").value = backExpectNum
        frontExpectNum = backExpectNum
    }

    if (frontExpectNum < viewFrontExpectNum) {
        for (var i = 0; i < viewFrontExpectNum - frontExpectNum; i++) {
            barChartData.labels.unshift(viewFrontExpectNum - i - 1);
            barChartData.datasets[0].data.unshift(probData[viewFrontExpectNum - i - 1]);
        }
    }
    else if (frontExpectNum > viewFrontExpectNum) {
        for (var i = 0; i < frontExpectNum - viewFrontExpectNum; i++) {
            barChartData.labels.shift();
            barChartData.datasets[0].data.shift();
        }
    }

    myChart.update();
    viewFrontExpectNum = frontExpectNum;
}

function backExpectUpdate() {
    var backExpectNum = Number(document.getElementById("backExpectNum").value)
    var frontExpectNum = Number(document.getElementById("frontExpectNum").value)

    var backExpectNum = chkNumRange(backExpectNum, viewFrontExpectNum, maxBackExpectNum)
    // document.getElementById("backExpectNum").value = backExpectNum

    if (backExpectNum > frontExpectNum) {
        document.getElementById("backExpectNum").value = backExpectNum
    }
    else {
        document.getElementById("backExpectNum").value = frontExpectNum
        backExpectNum = frontExpectNum
    }

    if (backExpectNum > viewBackExpectNum) {
        for (var i = 0; i < backExpectNum - viewBackExpectNum; i++) {
            barChartData.labels.push(viewBackExpectNum + i + 1);
            barChartData.datasets[0].data.push(probData[viewBackExpectNum + i + 1]);
        }
    }
    else if (backExpectNum < viewBackExpectNum) {
        for (var i = 0; i < viewBackExpectNum - backExpectNum; i++) {
            barChartData.labels.pop();
            barChartData.datasets[0].data.pop();
        }
    }

    myChart.update();
    viewBackExpectNum = backExpectNum;
}

function chkNumRange(target, min, max) {
    var num = target;
    if (target < min) {
        num = min
    }

    if (target > max) {
        num = max
    }
    return num
}

function getToggle(viewVal) {
    if (viewVal == true) {
        viewPercent = true;
    }
    else {
        viewPercent = false;
    }

    myChart.update();
}

