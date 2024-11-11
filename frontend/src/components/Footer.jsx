import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-white py-4 text-center w-full fixed bottom-0 left-0 space-y-2">
      <p className="flex justify-center text-gray-600 text-sm">
        © 2024 hyunwestpark, All rights reserved
      </p>
      <div className="flex justify-center space-x-3">
        <a
          href="https://github.com/hyunwestpark"
          className="underline hover:text-yellow-500 flex justify-center text-gray-600 text-sm"
        >
          <FontAwesomeIcon icon={faGithub} size="2x" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
