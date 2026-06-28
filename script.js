const students = [
{
name:"Sensei",
image:"https://i.postimg.cc/mcLZ6GKy/student-01.png",
score:0
},
{
name:"Guy",
image:"https://i.postimg.cc/bdsrhprt/student-02.png",
score:0
},
{
name:"Mimie",
image:"https://i.postimg.cc/6TyqXtq1/student-03.png",
score:0
},
{
name:"Ohm",
image:"https://i.postimg.cc/F17z4NzM/student-04.png",
score:0
},
{
name:"Pud",
image:"https://i.postimg.cc/23M6jMLg/student-05.png",
score:0
},
{
name:"Dechi",
image:"https://i.postimg.cc/PN9xf98s/student-06.png",
score:0
},
{
name:"Pun",
image:"https://i.postimg.cc/mhJDZJFR/student-07.png",
score:0
},
{
name:"Punn",
image:"https://i.postimg.cc/K4wzcwgZ/student-08.png",
score:0
},
{
name:"Cream",
image:"https://i.postimg.cc/vDkB8k64/student-09.png",
score:0
},
{
name:"Naan",
image:"https://i.postimg.cc/1fFz8Bp3/student-10.png",
score:0
},
{
name:"Alin",
image:"https://i.postimg.cc/8jvC74h6/student-11.png",
score:0
},
{
name:"Kierin",
image:"https://i.postimg.cc/cr3JvhQw/student-12.png",
score:0
},
{
name:"Hazeef",
image:"https://i.postimg.cc/0bSNznpd/student-13.png",
score:0
},
{
name:"Vienna",
image:"https://i.postimg.cc/KRTY1fnq/student-14.png",
score:0
},
{
name:"Rina",
image:"https://i.postimg.cc/YvwCYF3N/student-15.png",
score:0
},
{
name:"Iris",
image:"https://i.postimg.cc/68NpnZ0j/student-16.png",
score:0
},
{
name:"Chippy",
image:"https://i.postimg.cc/LJM8LPTw/student-17.png",
score:0
},
{
name:"Jomyust",
image:"https://i.postimg.cc/w1djLN2H/student-18.png",
score:0
},
{
name:"Ai-Jang",
image:"https://i.postimg.cc/5XM2Lzgf/student-19.png",
score:0
},
{
name:"Proadpran",
image:"https://i.postimg.cc/18c5Hz7Q/student-20.png",
score:0
},
{
name:"Iron",
image:"https://i.postimg.cc/LJB6TsQX/student-21.png",
score:0
},
{
name:"Indy",
image:"https://i.postimg.cc/FYgsZKC0/student-22.png",
score:0
},
{
name:"Martin",
image:"https://i.postimg.cc/hJD43qNv/student-23.png",
score:0
},
{
name:"Fong",
image:"https://i.postimg.cc/nsFVwtNX/student-24.png",
score:0
},
{
name:"Am",
image:"https://i.postimg.cc/sBjf0Rb7/student-25.png",
score:0
},
{
name:"Estelle",
image:"https://i.postimg.cc/rdVyYL71/student-26.png",
score:0
}
];

// โหลดคะแนนจาก LocalStorage
function loadScores(){
    const saved = JSON.parse(localStorage.getItem("scores"));
    if(saved){
        students.forEach((s,i)=>{
            s.score = saved[i] ?? 0;
        });
    }
}

// บันทึกคะแนน
function saveScores(){
    localStorage.setItem("scores", JSON.stringify(students.map(s=>s.score)));
}

// สร้างการ์ดนักเรียน
function renderStudents(){
    const container = document.getElementById("students");
    container.innerHTML = "";

    students.forEach((s,index)=>{
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${s.image}">
            <div class="name">${s.name}</div>
            <div class="score" id="score-${index}">${s.score}</div>

            <div class="controls">
                <button class="plus" onclick="addScore(${index})">+</button>
                <button class="minus" onclick="minusScore(${index})">-</button>
            </div>
        `;

        container.appendChild(card);
    });

    updateTop3();
}

// เพิ่มคะแนน
function addScore(i){
    students[i].score++;
    update(i);
}

// ลดคะแนน
function minusScore(i){
    students[i].score--;
    update(i);
}

// อัปเดต UI
function update(i){
    document.getElementById("score-"+i).innerText = students[i].score;
    saveScores();
    updateTop3();
}

// Top 3
function updateTop3(){
    const ranking = document.getElementById("ranking");

    const top = [...students]
        .sort((a,b)=>b.score - a.score)
        .slice(0,3);

    ranking.innerHTML = top.map((s,i)=>
        `<div class="top-card">🏅 ${i+1}. ${s.name} (${s.score})</div>`
    ).join("");
}

// Reset คะแนน
function resetScores(){
    students.forEach(s=>s.score=0);
    saveScores();
    renderStudents();
}

// Full Screen
function toggleFullScreen(){
    if(!document.fullscreenElement){
        document.documentElement.requestFullscreen();
    }else{
        document.exitFullscreen();
    }
}

// เริ่มระบบ
loadScores();
renderStudents();
