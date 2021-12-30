//ポップアップウインドウ作成関数
      function createWindow(dictList,windowMsg,{width='auto',height='auto',top='20px'}){
        //ウインドウパーツの定義
        const myWindow=document.createElement('div');
        const optionBar=document.createElement('div');
        const closeBtn=document.createElement('span');
        const title=document.createElement('span');
        //デザイン設定
        document.body.appendChild(myWindow);
        myWindow.style.position='fixed';
        myWindow.style.backgroundColor='white';
        myWindow.style.border='1px solid rgb(80,80,160)';
        myWindow.style.height=height;
        myWindow.style.width=width;
        myWindow.style.transform='translateX(-50%)';
        myWindow.style.marginLeft='50%';
        myWindow.style.top=top;
        myWindow.style.overflow='hidden';
        myWindow.appendChild(optionBar);
        optionBar.style.backgroundColor='rgb(80,80,160)';
        optionBar.style.display='flex';
        optionBar.style.justifyContent='space-between';
        optionBar.appendChild(title);
        optionBar.appendChild(closeBtn);
        title.innerHTML=windowMsg;
        title.style.color='white';
        title.style.fontSize='20px';
        title.style.padding='5px 10px';
        closeBtn.innerHTML='✕';
        closeBtn.style.color='white';
        closeBtn.style.fontWeight='bold';
        closeBtn.style.padding='5px 10px';
        closeBtn.style.fontSize='20px';
        closeBtn.style.cursor='pointer';
        //ウインドウ削除イベントの設定
        closeBtn.addEventListener('click',function(){
          this.parentNode.parentNode.outerHTML='';
        },false);
        let elem;//要素作成用
        let flexElem,flag=false;//横並べ用
        for(let i=0;i<dictList.length;i++){
          elem=createInputs(dictList[i].type,dictList[i].options); //要素取得
          if(elem!=='start' && elem!=='end' && !flag && elem){
            //flexオプション無しの場合
            myWindow.appendChild(elem);
          }else if(elem==='start'){
            //flexオプションがつけられた場合
            flexElem=document.createElement('div');
            flexElem.style.display='flex';
            flexElem.style.justifyContent='center';
            myWindow.appendChild(flexElem);
            flag=true;
          }else if(elem==='end'){
            //flexオプションが終わった場合
            flag=false;
          }else if(elem!=='start' && elem!=='end' && flag && elem){
            //flexオプション中
            flexElem.appendChild(elem);
          }
        }
      }

      //入力要素作成関数
      /* type別処理 */
      /* text:テキスト入力 + keydownイベント */
      /* btn:ボタン + clickイベント */
      /* date:日付入力 */
      /* textarea:複数行テキスト入力 */
      /* msg:ウインドウに表示するテキスト */
      /* img:画像表示 + clickイベント */
      /* startFlex:横並べ開始(主にbtn) */
      /* endFlex:横並べ終わり(主にbtn) */

      function createInputs(type, //入力形式
        {label='Label', //ラベル名
        id='', //付与するid
        border='1px solid black', //枠線CSS
        fontSize='20px', //文字の大きさCSS
        backgroundColor='white', //背景色CSS
        hoverColor='silver', //ホバー時の背景色
        width='100px', //横幅CSS
        func=null, //実行関数
        defaultValue=(new Date()).getFullYear()+'/'+(new Date().getMonth()+1)+'/'+(new Date().getDate()), //入力初期値(デフォルトは現在の日付)
        placeholder='', //ヒント
        path=''}
      ){
        if(type==='text'){
          //DOM構築
          const elem=document.createElement('div');
          const input=document.createElement('input');
          const title=document.createElement('span');
          elem.appendChild(title);
          elem.appendChild(input);
          title.innerHTML=label;
          input.setAttribute('id',id);
          //デザイン設定
          elem.style.padding='5px';
          input.style.outline='0px';
          input.style.border=border;
          input.style.fontSize=fontSize;
          title.style.fontSize=fontSize;
          input.style.width=width;
          input.placeholder=placeholder;
          input.value=defaultValue;
          //イベント設定
          input.addEventListener('focus',onFocusInput,false);
          input.addEventListener('blur',onBlurInput,false);
          input.addEventListener('keydown',func,false);
          return elem;
        }else if(type==='btn'){
          //DOM構築
          const elem=document.createElement('div');
          elem.innerHTML=label;
          elem.setAttribute('id',id);
          //デザイン設定
          elem.style.padding='5px 10px';
          elem.style.border=border;
          elem.style.borderRadius='20px';
          elem.style.backgroundColor=backgroundColor;
          elem.style.float='left';
          elem.style.margin='20px';
          elem.style.cursor='pointer';
          elem.style.width=width;
          elem.style.textAlign='center';
          //イベント設定
          elem.addEventListener('mouseover',{handleEvent:hoverBtn,color:hoverColor},false);
          elem.addEventListener('mouseout',{handleEvent:landingBtn,color:backgroundColor},false);
          elem.addEventListener('click',func,false);
          return elem;
        }else if(type==='date'){
          //DOM構築
          const date=defaultValue.split('/');
          //デフォルト値がなければ中止
          if(date.length!=3){
            return false;
          }
          const elem=document.createElement('div');
          const year=document.createElement('input');
          const yearLabel=document.createElement('span');
          const month=document.createElement('input');
          const monthLabel=document.createElement('span');
          const day=document.createElement('input');
          const dayLabel=document.createElement('span');
          const title=document.createElement('span');
          year.setAttribute('id',id+'_year');
          month.setAttribute('id',id+'_month');
          day.setAttribute('id',id+'_day');
          elem.appendChild(title);
          elem.appendChild(year);
          elem.appendChild(yearLabel);
          elem.appendChild(month);
          elem.appendChild(monthLabel);
          elem.appendChild(day);
          elem.appendChild(dayLabel);
          title.innerHTML=label;
          //デザイン設定
          year.type='number';
          year.min='1000';
          year.max='9999';
          year.value=date[0];
          month.type='number';
          month.min='1';
          month.max='12';
          month.value=date[1];
          day.type='number';
          day.min='1';
          day.max='31';
          day.value=date[2];
          yearLabel.innerHTML='年';
          monthLabel.innerHTML='月';
          dayLabel.innerHTML='日';
          year.style.fontSize=fontSize;
          month.style.fontSize=fontSize;
          day.style.fontSize=fontSize;
          year.style.width='3em';
          month.style.width='2em';
          day.style.width='2em';
          year.style.textAlign='right';
          month.style.textAlign='right';
          day.style.textAlign='right';
          title.style.fontSize=fontSize;
          elem.style.padding='5px';
          return elem;
        }else if(type==='textarea'){
          //DOM構築
          const elem=document.createElement('div');
          const input=document.createElement('textarea');
          const title=document.createElement('p');
          elem.appendChild(title);
          elem.appendChild(input);
          title.innerHTML=label;
          input.setAttribute('id',id);
          //デザイン設定
          elem.style.padding='5px';
          input.style.outline='0px';
          input.style.border=border;
          input.style.fontSize=fontSize;
          title.style.fontSize=fontSize;
          input.placeholder=placeholder;
          input.value=defaultValue;
          input.cols='40';
          input.rows='4';
          input.style.resize='none';
          //イベント設定
          input.addEventListener('focus',onFocusInput,false);
          input.addEventListener('blur',onBlurInput,false);
          return elem;
        }else if(type==='msg'){
          //DOM構築
          const elem=document.createElement('div');
          elem.innerHTML=label;
          //デザイン設定
          elem.style.textAlign='center';
          elem.style.fontSize=fontSize;
          return elem;
        }else if(type==='img'){
          //DOM構築
          const elem=document.createElement('div');
          const img=document.createElement('img');
          elem.appendChild(img);
          img.src=path;
          img.alt=label;
          //デザイン設定
          img.style.width=width;
          img.style.cursor='pointer';
          elem.style.textAlign='center';
          //イベント設定
          img.addEventListener('click',func,false);
          return elem;
        }else if(type==='startFlex'){
          return 'start';
        }else if(type==='endFlex'){
          return 'end';
        }else{
          return false;
        }
      }

      //ホバー時背景色変更
      function hoverBtn(e){
        e.currentTarget.style.backgroundColor=this.color;
      }

      //アンホバー時背景色変更
      function landingBtn(e){
        e.currentTarget.style.backgroundColor=this.color;
      }

      //フォーカス時
      function onFocusInput(){
        this.style.border='1px solid blue';
      }

      //アンフォーカス時
      function onBlurInput(){
        this.style.border='1px solid black';
      }
