import { motion } from 'framer-motion'

export default function About() {
  return (
    <section
      id="about"
      className="section-padding grid lg:grid-cols-2 gap-16 items-center"
    >
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
      >
        <img
          src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1400&auto=format&fit=crop"
          alt="R&G Restaurant"
          className="rounded-3xl"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
      >
        <p className="uppercase tracking-[0.3em] text-accent mb-3">
          About Us
        </p>

        <h2 className="text-5xl font-heading font-bold leading-tight mb-6">
          A True Ghanaian Chop-Bar Experience
        </h2>

        <p className="text-gray-400 leading-loose text-lg">
          R&G Restaurant is one of Tesano's most beloved destinations for
          authentic Ghanaian meals. Known for flavorful soups, fufu, waakye,
          banku, and vibrant local dining culture, it brings together the taste
          of tradition with a lively community atmosphere.
        </p>
      </motion.div>
    </section>
  )
}
