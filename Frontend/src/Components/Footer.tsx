import { Github, Twitter, Mail, Heart } from 'lucide-react';
import type { Theme } from '../hooks/useTheme';

interface FooterProps {
  theme: Theme;
}

export function Footer({ theme }: FooterProps) {
  const isDark = theme === 'dark';

  return (
    <footer
      className={`py-16 relative overflow-hidden transition-all duration-300 ${
        isDark
          ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white'
          : 'bg-gradient-to-br from-gray-100 via-purple-100 to-blue-100 text-gray-900'
      }`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-32 h-32 bg-purple-500 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Changed grid to flex justify-between */}
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
          {/* Left Section: Problem Hunter */}
          <div className="md:w-2/3">
            <h3
              className={`text-3xl font-bold mb-4 bg-clip-text text-transparent ${
                isDark
                  ? 'bg-gradient-to-r from-cyan-300 to-purple-300'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600'
              }`}
            >
              Problem Hunter
            </h3>
            <p
              className={`mb-4 max-w-md ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Your go-to platform for discovering and tracking programming
              problems across multiple competitive programming platforms.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/dhruvinjs/WebScraper"
                className={`transition-colors ${
                  isDark
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href=""
                className={`transition-colors ${
                  isDark
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href=""
                className={`transition-colors ${
                  isDark
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Section: Platforms */}
          <div className="md:w-1/3">
            <h4 className="text-lg font-semibold mb-4">Platforms</h4>
            <ul
              className={`space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            >
              <li>
                <a
                  href="#"
                  className={`transition-colors ${
                    isDark ? 'hover:text-white' : 'hover:text-gray-900'
                  }`}
                >
                  LeetCode
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`transition-colors ${
                    isDark ? 'hover:text-white' : 'hover:text-gray-900'
                  }`}
                >
                  Codeforces
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className={`border-t pt-8 flex flex-col md:flex-row justify-between items-center ${
            isDark ? 'border-gray-800' : 'border-gray-300'
          }`}
        >
          <p
            className={`mb-4 md:mb-0 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
          >
            © 2025 Problem Hunter. All rights reserved.
          </p>
          <div
            className={`flex items-center gap-2 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span>for competitive programmers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
