import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
import generateName from "sillyname";
import { randomSuperhero } from "superheroes";

inquirer
  .prompt([
    {
      type: "input", // Specify input type
      message: "What is your name?",
      name: "borja", 
    },
  ])
  .then((answers) => {
    var sillyName = generateName();
    var superhero = randomSuperhero();
    var txt =
      "Input: " 
      answers.borja
      "\nSilly Name: " 
      sillyName 
      "\nSuperhero: " 
      superhero;

    qrConvert(answers.borja, "name.png");
    qrConvert(sillyName, "sillyname.png");
    qrConvert(superhero, "superheroname.png");
    createTxt(txt);

    console.log("\nHello", answers.borja);
    console.log("Your villain name will be", sillyName);
    console.log("And your superhero name will be", superhero);
    console.log("\nQR codes are generated.");
  });

function qrConvert(data, filename) {
  var qr_img = qr.image(data, { type: "png" });
  qr_img.pipe(fs.createWriteStream(filename));
}

function createTxt(text) {
  fs.writeFile("myhero.txt", text, (err) => {
    if (err) throw err;
    console.log("Text file updated.");
  });
}
