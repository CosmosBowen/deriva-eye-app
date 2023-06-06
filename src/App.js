import './App.css';
import FileReaderComponent from './FileReader';
import ImageComponent from './ImageComponent';

const currentUrl = "/hatrac/images/scans/subject/1000355/observation/1440097/image/14360313/b3eedb890fe27e18c9d940ed25810cec.jpg";
const url = 'http://localhost:3001' + currentUrl;
// const exampleUrl = 'http://localhost:3001/hatrac/images/scans/subject/1000355/observation/1440097/image/14360314/cee45653be1a0ad4462eb7d9f216871e.jpg';
function App() {

  return (

    <div className='body'>
      {/* <ImageComponent imageUrl={url} />
      <ImageComponent imageUrl={exampleUrl} /> */}
      <FileReaderComponent />
    </div>
  );
}

export default App;

