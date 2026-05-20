import PoolImg from '../assets/pool.jpg' 
import ChopbarImg from '../assets/chopbarvibes.jpg'
import LogoTmg from '../assets/logo.jpg'

const images = [
  PoolImg,
  LogoTmg,
  ChopbarImg,
]

export default function Gallery() {
  return (
    <section id="gallery" className="section-padding">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-heading font-bold">Gallery</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {images.map((image) => (
          <div key={image} className="overflow-hidden rounded-3xl h-96">
            <img
              src={image}
              alt="R&G Restaurant gallery"
              className="w-full h-full object-cover hover:scale-110 transition duration-700"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
