let countNum;
let cardArray;
let time;
let timer;
const gameNums = document.querySelector('#game__numbers');

//カードに入れるナンバーをシャッフルする設定
const shuffleNumbers = () => {
    countNum = 1;
    cardArray = [];
    time = 0;

    //cardArrayに数字を足していく
    for (i = 0; i <= 24; i++) {
        cardArray.push(i);
    }

    //数字をランダムにする
    for (i = 0; i < cardArray.length; i++) {
        const tmpNum = cardArray[i];
        //24までの間のランダムな整数を1個とって「r」に入れる
        const r = Math.floor(Math.random() * cardArray.length);

        //i番目をランダムな数字「r」と入れ替える
        cardArray[i] = cardArray[r];
        //「r」が元あったところに「i」を入れ替える
        cardArray[r] = tmpNum;
        //上の2つが揃わないと、数字が書き換えだけになっで同じ数字が生まれてしまう！!!
    }
}

//初期プレイ時の設定
const init = () => {
    shuffleNumbers();

    // 最初のみ、numbersの中にカードを生成
    for (i = 0; i <= 24; i++) {
        //1を足して、表示を１〜２５にする
        const cardNum = cardArray[i] + 1;
        const newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'game__number');
        newDiv.textContent = cardNum;
        gameNums.appendChild(newDiv);
    }
}

init();

//リプレイ時の設定
const replay = () => {
    shuffleNumbers();

    for (i = 0; i <= 24; i++) {
        //1を足して、表示を１〜２５にする
        const cardNum = cardArray[i] + 1;
        nums[i].textContent = cardNum;
        nums[i].classList.remove('hit');
    }
}

//プレイ時間計測用タイマーの設定
const timerFunc = () => {
    time++;

    //表示する数字を秒にして、小数点第一位まで常に表示
    const sec = time / 10;
    timerSpan.textContent = sec.toFixed(1);
};

//スタート画面の設定 ボタンを押したら消す
const gameBtn = document.querySelector('.game__btn');
const gameStart = document.querySelector('.game__startScene');

gameBtn.addEventListener('click', function () {
    gameStart.classList.add('hide');

    //スタートボタンをクリックしたらタイマー開始
    timerFunc();
    timer = setInterval(timerFunc, 100); // 1/10秒まで表示
});


//ゲーム中の設定
let nums = document.querySelectorAll('.game__number');
const recordSpan = document.querySelector('.header__recordSpan');
const timerSpan = document.querySelector('.header__timerSpan');

nums.forEach(function (num) {
    num.addEventListener('click', function () {
        const selectNum = parseInt(num.innerHTML);//比較のため中身を数値で取得
        console.log(selectNum);
        console.log(countNum);
        console.log('クリックしました');

        if (selectNum === countNum) {
            this.classList.add('hit');

            //hitしたら数字を増やす
            countNum++;

            //countが26になったら 終了後の処理をする
            if (countNum === 26) {
                clearInterval(timer);

                //終わった時間を取得し、スタート画面を書き換える
                const recordValue = parseInt(recordSpan.innerHTML);//比較のため中身を数値で取得
                const timerValue = timerSpan.textContent;
                const finishTime = document.querySelector('.game__finishTime');
                finishTime.textContent = `Your Record : ${timerValue} sec`;

                //ボタンのテキストを変更
                gameBtn.textContent = 'PLAY AGAIN';

                //スタート画面を表示
                gameStart.classList.remove('hide');

                //プレイ時間を比較・BestRecord表示
                if (recordValue - timerValue > 0 || recordValue === 0) {
                    //記録を更新
                    recordSpan.textContent = timerValue;
                }

                // リプレイ時の設定を読み込む
                replay();
            }
        }
    });
});
