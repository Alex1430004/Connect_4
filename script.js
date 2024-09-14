const xSize = 7, ySize = 6

let GameStatus = [];
let TurnNum = 0
let Turn = "B";
let Win = false;

let winsound = new Audio("Assets/Party_Horn.mp3");

// Create chip slots
for (let i=0; i<ySize; i++) {
    let tr = document.createElement("tr");
    GameStatus.push([]);
    for (let j=0; j<xSize; j++) {
        let td = document.createElement("td");
        let button = document.createElement("button");
        button.type = "button";
        button.id = "slot_"+j.toString()+"_"+i.toString();
        button.setAttribute("onclick", "PlaceChip("+ j + ", " + i + ")");
        GameStatus[i][j] = "X";
        td.appendChild(button);
        tr.appendChild(td);
    }
    document.getElementById("boardtbody").appendChild(tr);
}

// Place chip
function PlaceChip(xpos, ypos) {
    if (Win) {return;}

    if (GameStatus[ypos][xpos] != "X") {
        alert("Already Taken");
    }
    else {
        while (ypos + 1 < ySize && GameStatus[ypos + 1] !== undefined && GameStatus[ypos + 1][xpos] == "X") {
            ++ypos;
        }

        //Check if win

        function CheckRow() {
            let inarow = 1;
            let xcheck = xpos;
            let ycheck = ypos;
    
            while (xcheck+1 < xSize) {
                if (GameStatus[ycheck][xcheck+1] == Turn) {
                    inarow++; xcheck++;
                }
                else {break;}
            }
            xcheck = xpos;
            while (xcheck-1 >= 0) {
                if (GameStatus[ycheck][xcheck-1] == Turn) {
                    inarow++; xcheck--;
                }
                else {break;}
            }
    
            if (inarow >= 4) {return true;}
    
        }

        function CheckColumn() {
            let inarow = 1;
            let xcheck = xpos;
            let ycheck = ypos;
    
            while (ycheck+1 < ySize) {
                if (GameStatus[ycheck+1][xcheck] == Turn) {
                    inarow++; ycheck++;
                }
                else {break;}
            }
            ycheck = ypos;
            while (ycheck-1 >= 0) {
                if (GameStatus[ycheck-1][xcheck] == Turn) {
                    inarow++; ycheck--;
                }
                else {break;}
            }
    
            if (inarow >= 4) {return true;}
    
        }

        function CheckDiagonalRightTop() {
            let inarow = 1;
            let xcheck = xpos;
            let ycheck = ypos;
    
            while (ycheck-1 >= 0 && xcheck+1 < xSize) {
                if (GameStatus[ycheck-1][xcheck+1] == Turn) {
                    inarow++; xcheck++; ycheck--;
                }
                else {break;}
            }
            xcheck = xpos;
            ycheck = ypos;
            while (ycheck+1 < ySize && xcheck-1 >= 0) {
                if (GameStatus[ycheck+1][xcheck-1] == Turn) {
                    inarow++; xcheck--; ycheck++;
                }
                else {break;}
            }
    
            if (inarow >= 4) {return true;}
    
        }

        function CheckDiagonalLeftTop() {
            let inarow = 1;
            let xcheck = xpos;
            let ycheck = ypos;
    
            while (ycheck+1 < ySize && xcheck+1 < xSize) {
                if (GameStatus[ycheck+1][xcheck+1] == Turn) {
                    inarow++; xcheck++; ycheck++;
                }
                else {break;}
            }
            xcheck = xpos;
            ycheck = ypos;
            while (ycheck-1 >= 0 && xcheck-1 >= 0) {
                if (GameStatus[ycheck-1][xcheck-1] == Turn) {
                    inarow++; xcheck--; ycheck--;
                }
                else {break;}
            }
    
            if (inarow >= 4) {return true;}
    
        }

        TurnNum++;

        //Visuals

        GameStatus[ypos][xpos] = Turn;
        if (Turn == "B") {
            document.getElementById("slot_" + xpos.toString() + "_" + ypos.toString()).style.backgroundColor = "rgb(55, 55, 55)";
            document.getElementById("whoseturn").innerHTML = "Red's Turn";
            document.getElementById("whoseturn").style.color = "rgb(210, 0, 0)";
        }
        else {
            document.getElementById("slot_" + xpos.toString() + "_" + ypos.toString()).style.backgroundColor = "rgb(210, 0, 0)";
            document.getElementById("whoseturn").innerHTML = "Black's Turn";
            document.getElementById("whoseturn").style.color = "rgb(55, 55, 55)";
        }

        if (CheckRow() || CheckColumn() || CheckDiagonalRightTop() || CheckDiagonalLeftTop()) {
            let colors;
            if (Turn == "B") {
                document.getElementById("whoseturn").innerHTML = "Black Wins!";
                colors = ["#ffffff", "#525252"];
            }
            else {
                document.getElementById("whoseturn").innerHTML = "Red Wins!";
                colors = ["#ffffff", "#ff2e2e"];
            }
            document.getElementById("whoseturn").style.color = "rgb(16, 161, 18)";
            Win = true;

            document.getElementById("replay").style.display = " block";

            const end = Date.now() + 5 * 1000;

            winsound.play();

            (function frame() {
            confetti({
                particleCount: 4,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors,
            });

            confetti({
                particleCount: 4,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors,
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
            })();
        }
        else if (TurnNum == xSize*ySize) {
            document.getElementById("whoseturn").innerHTML = "Tied!";
            document.getElementById("whoseturn").style.color = "rgb(16, 161, 18)";
            Win = true;
            document.getElementById("replay").style.display = " block";
        }

        if (Turn == "B") {Turn = "R";}
        else {Turn = "B";}
    }
}

function PlayAgain() {
    location.reload();
}