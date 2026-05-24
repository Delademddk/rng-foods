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
            <div className="flex gap-4 items-center">
              <MapPin className="text-accent" />
              <p>
                GCTU / Tesano, Accra
                <br />
                Near Abeka Junction
              </p>
            </div>

            <div className="flex gap-4 items-center">
              <Phone className="text-accent" />
              <div className="flex flex-col gap-1">
                <a href="tel:+233550007554" className="hover:text-accent py-1 transition-colors">
                  +233 55 000 7554
                </a>
                <a href="tel:+233209644904" className="hover:text-accent py-1 transition-colors">
                  +233 20 964 4904
                </a>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <Clock className="text-accent" />
              <div>
                <p>Monday - Sunday</p>
                <p>8:00 AM - 11:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-sm border border-white/10 shadow-2xl w-full h-[450px] transition-all duration-500 hover:scale-[1.01] ">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d464.3572394997647!2d-0.2244410633993344!3d5.5978896202693305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf99cca8369f4f%3A0xec20004ca88c2055!2sR%20and%20G%20Foods!5e1!3m2!1sen!2sgh!4v1779545354695!5m2!1sen!2sgh"
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
