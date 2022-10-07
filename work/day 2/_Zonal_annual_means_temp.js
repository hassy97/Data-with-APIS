makeChart();

async function makeChart(){
     //jab tak data nh ata chart nh bane ga 
    const data =  await getData();

    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels:data.xs,
            datasets: [{
                label: 'Combined Land-Surface Air and Sea-Surface Water Temperature',
                data: data.ys,
                fill:false,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',

                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

async function getData(){
    const xs = []
    const ys = []

    const response = await fetch('ZonAnn.Ts+dSST.csv')
    const data  = await response.text()
    console.log(data);

    //data ko split krnaa ha aik row main phr aik row bh split krna ha 
    const table = data.split('\n');
    table.forEach(ele=>{
        const row = ele.split(',');
        const year = row[0];
        xs.push(year);
        const temp = row[1];
        ys.push(parseFloat(temp)); // because its a average mean tempeature 
        console.log(year,temp);
    })

    return {xs, ys}
    



}



