import { DotsThreeCircleIcon } from "@phosphor-icons/react";
import React from "react";
import { motion} from "framer-motion";

export default function ProfileMainContent() {
  return (
    <div className="text-light">
      <div>
        <img
          src="https://i.pinimg.com/1200x/16/d2/db/16d2dbd869837a85b4b948b079ebc807.jpg"
          className="object-cover max-h-36 w-full rounded-b-lg"
        />
        <div className="ml-4 flex flex-col gap-2">
          <img
            src="https://i.pinimg.com/736x/64/5c/ff/645cffeebcd1061e47c2b9ddb82492b3.jpg"
            className="object-cover size-28 rounded-lg -mt-8"
          />
          <p>
            Luiz Gustavo ·{" "}
            <span className="text-lines text-sm">@luizlegal </span>
          </p>
          <div className="flex gap-2 items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/1200px-Flag_of_Brazil.svg.png"
              className="w-5 h-3 rounded-sm object-cover"
            />
            <p className="text-sm">Rio de Janeiro, Brasil</p>
          </div>
          <div className="flex gap-2 items-center">
          <DotsThreeCircleIcon size={24} className="cursor-pointer"/>
          <button className="bg-transparent border border-light rounded-full px-4 text-sm hover:bg-light/10 transition cursor-pointer">Mensagem</button>
          <button className="bg-transparent border border-light rounded-full px-4 text-sm hover:bg-light/10 transition cursor-pointer">Seguir</button>
          </div>
        </div>
      </div>
    </div>
  );
}
