function splitJobCharacters(str) {
  // "idaz-sfmutvi,anggara-sfutqji,fika-sfldbi" -> ["idaz","sfmutvi","anggara","sfutqji","fika","sfldbi"]
  const splitted = [];

  let currentCharacter = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "-" || str[i] === ",") {
      splitted.push(currentCharacter);
      currentCharacter = "";
    } else {
      currentCharacter += str[i];
    }
  }
  splitted.push(currentCharacter); // Selalu push karakter terakhir karena tidak di stop dengan - atau ,

  return splitted;
}

function reverseJobCharacters(arr) {
  // ["idaz","sfmutvi","anggara","sfutqji","fika","sfldbi"] -> ["idaz","ivtumfs","anggara","ijqtufs","fika","ibdlfs"]

  // loop setiap job
  for (let i = 1; i < arr.length; i += 2) {
    let reversed = "";

    const job = arr[i];
    // loop setiap char
    for (let char = job.length - 1; char >= 0; char--) {
      reversed += job[char];
    }

    // replace item di array
    arr[i] = reversed;
  }

  return arr;
}

// data alfabet agar bisa shift character dan decrypt job
// Data alphabet dalam objek untuk mempercepat lookup.
const alphabets = {
  a: "z",
  b: "a",
  c: "b",
  d: "c",
  e: "d",
  f: "e",
  g: "f",
  h: "g",
  i: "h",
  j: "i",
  k: "j",
  l: "k",
  m: "l",
  n: "m",
  o: "n",
  p: "o",
  q: "p",
  r: "q",
  s: "r",
  t: "s",
  u: "t",
  v: "u",
  w: "v",
  x: "w",
  y: "x",
  z: "y",
};
function decryptJobCharacters(arr) {
  // loop setiap job
  // ["idaz","ivtumfs","anggara","ijqtufs","fika","ibdlfs"] -> ["idaz","hustler","anggara","hipster","fika","hacker"]
  for (let i = 1; i < arr.length; i += 2) {
    let decrypted = "";

    const job = arr[i]; // ivtumfs
    // loop setiap char dalam job
    for (let char = 0; char < job.length; char++) {
      const letter = job[char];

      // cari char di objek alphabets
      decrypted += alphabets[letter];
    }

    // replace item di array
    arr[i] = decrypted;
  }

  return arr;
}

function makingDreamTeam(arr) {
  // ["idaz","hustler","anggara","hipster","fika","hacker"] -> [["idaz","hustler"],["anggara","hipster"],["fika","hacker"]]
  const team = [];

  // Looping per dua elemen, langsung ambil 2 sekaligus untuk mengurangi jumlah iterasi,
  // Kondisi arr.length - 1 karena kita mengambil dua sekaligus, jadi jika jumlah array ganjil data terakhir akan dilewati.
  for (let i = 0; i < arr.length - 1; i += 2) {
    team.push([arr[i], arr[i + 1]]);
  }

  return team;
}

function startUpMatchMaking(str) {
  // Jika team startup memiliki character kurang dari 3 maka tampilkan Minimum 3 members in the team
  // Jika di dalam team startup memiliki character dengan job hustler, hipster dan hacker maka tampilkan Match your dream Start-up team.
  // Jika tidak maka tampilkan The job composition in the team is not suitable.

  let data = splitJobCharacters(str);
  data = reverseJobCharacters(data);
  data = decryptJobCharacters(data);
  data = makingDreamTeam(data);

  // FIRST CHECK: Minimal 3 member dalam team
  if (data.length < 3) {
    return "Minimum 3 members in the team";
  }

  // [["idaz","hustler"],["anggara","hipster"],["fika","hacker"]];

  // SECOND CHECK: Komposisi team sesuai kebutuhan
  // cek job lengkap atau tidak. Disimpan dalam hashmap agar lebih efisien
  const requiredJobs = {
    hustler: false,
    hipster: false,
    hacker: false,
  };
  for (let i = 0; i < data.length; i++) {
    const job = data[i][1];

    // loop jika job telah ditemukan agar tidak menambah ke array
    let jobStatus = requiredJobs[job];

    // Jika job false maka rubah. Jika job tidak ada tidak terpengaruh karena kita tidak rubah objeknya
    if (jobStatus === false) {
      requiredJobs[job] = true;
    }
  }

  const requiredJobKeys = Object.keys(requiredJobs);
  for (let i = 0; i < requiredJobKeys.length; i++) {
    // Return jika salah satu false
    if (!requiredJobs[requiredJobKeys[i]]) {
      return "The job composition in the team is not suitable";
    }
  }

  // Return jika 2 cek telah berhasil
  return "Match your dream Start-up team";
}

// TEST
console.log(startUpMatchMaking("idaz-sfmutvi,anggara-sfutqji,fika-sfldbi"));
console.log(
  startUpMatchMaking(
    "eko-sfldbi,fajrin-sfmutvi,abdullah-sfutqji,anggara-sfutqji"
  )
);
console.log(
  startUpMatchMaking(
    "abdullah-sfldbi,fajrin-sfmutvi,samir-sfldbi,eko-sfmutvi,basil-sfmutvi"
  )
);
console.log(startUpMatchMaking("samir-sfmutvi,basil-sfutqji,eko-sfmutvi"));
console.log(startUpMatchMaking("samir-sfmutvi,basil-sfutqji"));

// EXPECTED RESULT:
// Match your Dream Start-Up Team
// Match your Dream Start-Up Team
// The job composition in the team is not suitable
// The job composition in the team is not suitable
// Minimum 3 members in the team
