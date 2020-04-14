const key = '8f657d4bd948c3e6c1aeef5fa5210115';
const endPoint = `https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=${key}`;


const updateDom = (data) => {
  const { sys, main, weather } = data;
  const dataAsArr = Object.values(data);
  let output = 'Empty';
  dataAsArr.forEach((item) => {
    output += `
			<li>Corordinates: <strong> ${item}</strong></li>
		`;
  });
  document.querySelector('#output').innerHTML = output;
};


fetch(endPoint)
  .then((res) => {
    if (res.status !== 200) {
      // console.log('Sorry an Error Ocured: ', res.status);
      return;
    }
    return res.json();
  })
  .then((data) => {
    updateDom(data);
  })
  .catch((error) => {
    // console.log('Fetch Error: ', error);
  });


