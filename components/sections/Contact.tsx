import { MapPin, Phone, Clock } from "lucide-react";

interface ContactProps {
  siteSettings: {
    phone: string;
    address: string;
    workingHours: string;
    googleMapsUrl: string;
  };
}

export default function Contact({ siteSettings }: ContactProps) {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <p className="text-green-600 font-semibold uppercase tracking-wider">
            Get In Touch
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Contact Us
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">

          <div>

            <div className="space-y-8 mb-8">

              <div className="flex gap-4">
                <div className="bg-blue-100 p-4 rounded-xl">
                  <MapPin />
                </div>

                <div>
                  <h3 className="font-bold text-xl">Address</h3>
                  <p className="text-gray-600">
                    {siteSettings.address}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-blue-100 p-4 rounded-xl">
                  <Phone />
                </div>

                <div>
                  <h3 className="font-bold text-xl">Phone</h3>
                  <p className="text-gray-600">
                    {siteSettings.phone}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-blue-100 p-4 rounded-xl">
                  <Clock />
                </div>

                <div>
                  <h3 className="font-bold text-xl">Working Hours</h3>
                  <p className="text-gray-600">
                    {siteSettings.workingHours}
                  </p>
                </div>
              </div>

            </div>

            <div className="rounded-2xl overflow-hidden shadow-lg h-[400px]">
          
              <iframe
                src="https://maps.google.com/maps?q=Solapara%20Road%20Guwahati&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen
              />
            </div>

          </div>    

          <div className="bg-white p-8 rounded-3xl shadow-lg">

            <h3 className="text-3xl font-bold mb-8">
              Request Service
            </h3>

            <form className="space-y-4">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full border rounded-xl p-4"
              />

              <input
                type="text"
                placeholder="Phone Number"
                className="w-full border rounded-xl p-4"
              />

              <input
                type="text"
                placeholder="Address"
                className="w-full border rounded-xl p-4"
              />

              <select className="w-full border rounded-xl p-4">
                <option>Select Service</option>
                <option>Septic Tank Cleaning</option>
                <option>Drain Cleaning</option>
                <option>Emergency Service</option>
              </select>

              <textarea
                rows={5}
                placeholder="Additional Message"
                className="w-full border rounded-xl p-4"
              />

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold"
              >
                Request Service
              </button>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}