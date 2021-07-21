import axios from 'axios';

const ImportJsonPortfolio = () => {
  let fileReader = new FileReader();
  let json: JSON;

  const handleFileRead = async () => {
    const content = fileReader.result;
    console.log(content)
    if(typeof content == 'string') {
      json =JSON.parse(content);
    }
    console.log(json);

    // … do something with the 'json' …
    const res = await axios.post('https://httpbin.org/post', { answer: 42 });

    if (res.status == 200) {
      //do the good good!
    }

  };

  const handleFileChosen = (file: Blob) => {
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  return <div className='uploadPortfolio'>
    <input
      type='file'
      id='file'
      className='input-file'
      accept='.json'
      onChange={e => handleFileChosen(e.target.files![0])}
    />
  </div>;
};

export default ImportJsonPortfolio;
