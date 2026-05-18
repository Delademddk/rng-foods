const images = [
  'https://i2.pickpik.com/photos/963/819/579/billiards-pool-tables-bar-pub-preview.jpg',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop',
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
