import { motion } from 'framer-motion'
import { dishes } from '../data/dishes'

export default function Dishes() {
  return (
    <section id="menu" className="section-padding">
      <div className="text-center mb-16">
        <p className="text-accent uppercase tracking-[0.3em] mb-3">
          Popular Meals
        </p>

        <h2 className="text-4xl md:text-5xl font-heading font-bold">
          Signature Dishes
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {dishes.map((dish, index) => (
          <motion.div
            key={dish.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ y: -10 }}
            className="overflow-hidden rounded-3xl bg-white/5 border border-white/10"
          >
            <div className="overflow-hidden h-72">
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-full object-cover hover:scale-110 transition duration-700"
              />
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-3">{dish.name}</h3>

              <p className="text-gray-400 leading-relaxed">
                {dish.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
