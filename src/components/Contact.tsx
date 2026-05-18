import { MapPin, Phone, Clock } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="section-padding">
      <div className="grid lg:grid-cols-2 gap-16">
        <div>
          <p className="uppercase tracking-[0.3em] text-accent mb-4">
            Visit Us
          </p>

          <h2 className="text-5xl font-heading font-bold mb-10">
            Find R&G Restaurant
          </h2>

          <div className="space-y-8 text-gray-300">
            <div className="flex gap-4">
              <MapPin className="text-accent" />
              <p>
                GCTU / Tesano, Accra
                <br />
                Near Abeka Junction
              </p>
            </div>

            <div className="flex gap-4">
              <Phone className="text-accent" />
              <div>
                <p>+233 20 000 0000</p>
                <p>+233 50 000 0000</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Clock className="text-accent" />
              <div>
                <p>Monday - Saturday</p>
                <p>11:30 AM - 7:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-sm border border-white/10 shadow-2xl w-full h-[450px] transition-all duration-500 hover:scale-[1.01] ">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d589.2936622615845!2d-0.22595775392540324!3d5.598998754999542!2m3!1f0!2f0!3f0!3m2!1i1024!1i768!4f13.1!3m3!1m2!1s0xfdf9980b092f285%3A0xa5143f70ea5c26df!2sPitstop!5e1!3m2!1sen!2sgh!4v1779035954580!5m2!1sen!2sgh"
            className="w-full h-full rounded-3xl"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
