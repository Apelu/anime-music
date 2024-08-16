import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@assets/custom.scss";

import ReactDOM from "react-dom/client";

import router from "@features/routing/routes";
import { RouterProvider } from "react-router-dom";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(<RouterProvider router={router} />);

/*

Cyber-Taur

*Fade in from black (Scene - Deserted Gas Station | Ambient sound: Motorcycle hum that fades in with the light)
"***shuffling sounds***"
*Turn to Sounds
!!! Notice - You are being robbed [X to Dismiss]
!!! Notice - You have been robbed of 10 units of Fuel, 8 units of Food, and 6 units of Water [X to Dismiss]
!!! Notice - The thief is trying to escape, defeat the thief and retrieve your items [X to Dismiss]

Weapons:

Close combat
-Baseball Bat [Wood | Durability - 5/10]

Ranged Combat:
-Pistol [3 bullets]

The thief has escaped!

Warning! You are running low on Fuel! Obtain resources as soon as possible

Fuel | Food | Water | Guns + Bullets

CyberTaur
-A once human being made into something more.
-Suffers from amnesia and insomnia.
-Lone survivor
-AI companion (Give a name, Give a voice)


MAI (Motocycle AI)
-An artificial intelligence with the ability to learn
-Missing Data Entries
-CyberTaur's Mental Pillar
-Helps CyberTaur Keep Track of Items and Not Get Robbed
-Holds CyberTaur's Weapons

GamePlay
-Use Weapons (Pistol, Baseball Bats)
-Helmet (Starter is a Paper Bag)
-Armor (Starter is a Cloak)
-Fending off thiefs
-Filling up gas
-Killing Zombies

Assets:
-Player (CyberTaur)
-Moped
-Pistol
-Bat
-Gas Station
-Enemy's
-Zombies
-


 */
