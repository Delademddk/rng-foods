import { motion } from "framer-motion";

export default function Experience() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        <p className="uppercase tracking-[0.3em] text-accent mb-4">
          Experience
        </p>

        <h2 className="text-5xl font-heading font-bold mb-8">
          More Than Just Food
        </h2>

        <p className="text-gray-300 text-xl leading-loose">
          From the aroma of simmering soup to the lively lunchtime energy, R&G
          Restaurant captures the spirit of authentic Ghanaian dining. Every
          meal feels homemade, communal, and unforgettable.
        </p>
      </motion.div>
    </section>
  );
}
