import Feature from "./Feature.jsx"
import Header from "./Header.jsx"
import pic from "./assets/dumbbell.png"
import pic2 from "./assets/Bus.png"
import pic3 from "./assets/megaphone.png"
import pic4 from "./assets/book.png"

function App() {
	document.title = "Student Hub"
  return (
	  <>
		<Header/>
		<Feature image = {pic} title="WLV Gym" info="Open"/>
		<Feature image = {pic2} title="Travel" info="Bus times: "/>
		<Feature image = {pic3} title="SU Events" info="Event "/>
		<Feature image = {pic4} title="Harrison Library" info="Status: "/>
	  </>
  
  )
}

export default App
