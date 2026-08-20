import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="container mx-auto px-5 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="text-2xl font-bold text-white">
              Gear<span className="text-blue-500">Up</span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-400">
              Rent sports and outdoor gear instantly. Get the equipment you need
              for your next adventure.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="https://www.facebook.com/horidas.sarker.1"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition hover:bg-blue-600 hover:text-white"
              >
                <FaFacebookF className="h-4 w-4" />
              </a>

              <a
                href="https://www.instagram.com/"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition hover:bg-pink-600 hover:text-white"
              >
                <FaInstagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="transition hover:text-blue-500">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/gears" className="transition hover:text-blue-500">
                  Gear
                </Link>
              </li>

              <li>
                <Link href="/" className="transition hover:text-blue-500">
                  Categories
                </Link>
              </li>

              <li>
                <Link href="/about" className="transition hover:text-blue-500">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">Support</h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/contact"
                  className="transition hover:text-blue-500"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link href="/" className="transition hover:text-blue-500">
                  FAQ
                </Link>
              </li>

              <li>
                <Link href="/" className="transition hover:text-blue-500">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link href="/" className="transition hover:text-blue-500">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Get In Touch
            </h3>

            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <MdEmail className="h-5 w-5 shrink-0 text-blue-500" />
                <span>horidassarker6@gmail.com</span>
              </li>

              <li className="flex items-center gap-3">
                <MdPhone className="h-5 w-5 shrink-0 text-blue-500" />
                <span>+880 1816553754</span>
              </li>

              <li className="flex items-center gap-3">
                <MdLocationOn className="h-5 w-5 shrink-0 text-blue-500" />
                <span>Savar, Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-6 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-gray-300">GearUp</span>. All
            rights reserved. | Designed & Developed by{" "}
            <span className="text-blue-400 font-medium">Haridas Sarker</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
