import '../assets/styles/css/style1.css'


// Function to dynamically import all images from a folder
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

// Import all images from assets/images
const images = importAll(require.context('../assets/images', false, /\.(png|jpe?g|svg)$/));

const HomePage = () => {
    return (
        <div>
            <section className="coffee_section layout_padding">
                <div className="container">
                    <div className="row">
                        <h1 className="coffee_taital">Devices</h1>
                        <div className="bulit_icon"><img src={images['bulit-icon.png']} alt="Built Icon" /></div>
                    </div>
                </div>
                <div className="device_section_2">
            <div id="main_slider" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="container-fluid">
                            <div className="row">

                                <div className="col-lg-3 col-md-6">
                                    <div className="device_img"><img src={images['img-1.png']} alt="Coffee Type 1" /></div>
                                    <h3 className="types_text">TYPES OF COFFEE</h3>
                                    <p className="looking_text">Looking at its layout.</p>
                                    <div className="read_bt"><a href="#">Details</a></div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            </section>
        </div>
    );
};

export default HomePage;
