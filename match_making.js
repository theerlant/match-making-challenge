function splitJobCharacters(str) {
  let splitted = [];

  let currentCharacter = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "-" || str[i] === ",") {
      splitted.push(currentCharacter);
      currentCharacter = "";
    } else {
      currentCharacter += str[i];

      // loop terakhir
      if (i === str.length - 1) {
        splitted.push(currentCharacter);
      }
    }
  }

  return splitted;
}

function reverseJobCharacters(arr) {
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
const alphabets = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
function decryptJobCharacters(arr) {
  // loop setiap job
  for (let i = 1; i < arr.length; i += 2) {
    let decrypted = "";

    const job = arr[i];
    // loop setiap char dalam job
    for (let char = 0; char < job.length; char++) {
      const letter = job[char];

      // cari char di array alphabet
      for (let alphabet = 0; alphabet < alphabets.length; alphabet++) {
        if (letter == alphabets[alphabet]) {
          // shift ke kiri, jika 0 (a) shift ke akhir (z)
          if (alphabet === 0) {
            decrypted += alphabets[alphabets.length - 1];
          } else {
            decrypted += alphabets[alphabet - 1];
          }
        }
      }
    }

    // replace item di array
    arr[i] = decrypted;
  }

  return arr;
}

function makingDreamTeam(arr) {
  const team = [];

  let member = [];
  for (let i = 0; i < arr.length; i++) {
    member.push(arr[i]);

    if (member.length === 2) {
      team.push(member);
      member = [];
    }
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

  // SECOND CHECK: Komposisi team sesuai kebutuhan
  // cek job lengkap atau tidak
  const requiredJobs = ["hustler", "hipster", "hacker"];
  const foundJobs = [];
  for (let i = 0; i < data.length; i++) {
    const job = data[i][1];

    // loop jika job telah ditemukan agar tidak menambah ke array
    let taken = false;
    for (let j = 0; j < foundJobs.length; j++) {
      if (job == foundJobs[j]) {
        taken = true;
        break;
      }
    }

    if (!taken) {
      // cek apakah job sesuai requirement sebelum ditambahkan (tambahan)
      for (let j = 0; j < requiredJobs.length; j++) {
        if (job === requiredJobs[j]) {
          foundJobs.push(job);
        }
      }
    }
  }

  // finally pastikan apakah found jobs = required jobs.
  if (requiredJobs.length != foundJobs.length) {
    return "The job composition in the team is not suitable";
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
