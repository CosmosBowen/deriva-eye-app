import './App.css';
import UrlReaderComponent from './UrlReader';
import FileReaderComponent from './FileReader';
import YourComponent from './test';
import UrlParamsComponent from './urlParams';

const currentUrl = "/hatrac/images/scans/subject/1000355/observation/1440097/image/14360313/b3eedb890fe27e18c9d940ed25810cec.jpg";
const url = 'http://localhost:3001' + currentUrl;
// const exampleUrl = 'http://localhost:3001/hatrac/images/scans/subject/1000355/observation/1440097/image/14360314/cee45653be1a0ad4462eb7d9f216871e.jpg';
function App() {

  return (

    <div className='body'>
      {/* <UrlReaderComponent /> */}
      <FileReaderComponent />
      {/* <UrlParamsComponent /> */}
    </div>
  );
}

export default App;

