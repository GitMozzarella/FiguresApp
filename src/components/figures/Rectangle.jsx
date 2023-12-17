import React, { useEffect, useRef, useState } from 'react';

const Rectangle = ({
  figure,
  id,
  selectedFigures,
  setSelectedFigures,
  deleteFigure,
  workspaceRef
}) => {
  const itemRef = useRef(null);
  //Дублирется название ключа в двух местах, нужно вынести в константу (в Triangle.jsx аналогично)
  const storedPosition = JSON.parse(localStorage.getItem(`rectangle_${id}_position`));
  //Нужна тотальная проверка типа при работе с LS (см. что имею в виду в конце файла)
  const initialX = storedPosition ? storedPosition.x : Math.floor(Math.random() * 900) + 1;
  const initialY = storedPosition ? storedPosition.y : Math.floor(Math.random() * 600) + 80;

  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    //тяжело читается такое оформление, в Triangle ты вынес операции в переменные и суть уже понять легче.
    //Плюс, как вижу если оформить в том же стиле получиться точь-в-точь тот же код, что и в Triangle - а значит можно вынести
    //    логику в кастомный хук и заиспользовать его для обоих фигур (а в будущем переиспользовать для других типов, если приложение будет расширяться)
    const handleMouseMove = e => {
      if (!dragging) return;

      let newX = Math.min(
        Math.max(e.clientX - offset.x, 0),
        workspaceRef.current.offsetWidth - itemRef.current.offsetWidth
      );

      let newY = Math.min(
        Math.max(e.clientY - offset.y, 0),
        workspaceRef.current.offsetHeight - itemRef.current.offsetHeight
      );

      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, offset, workspaceRef]);

  const handleMouseDown = e => {
    setDragging(true);
    setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  useEffect(() => {
    localStorage.setItem(`rectangle_${id}_position`, JSON.stringify(position));
  }, [position, id]);

  //Тег можно оформить в виде самозакрывающегося
  return (
    <div
      style={{
        position: 'absolute',
        backgroundColor: figure.color,
        cursor: dragging ? 'grabbing' : 'pointer',
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
      ref={itemRef}
      key={id}
      className={`newRectangle ${selectedFigures === id ? 'selected' : ''}`}
      onClick={() => setSelectedFigures(id)}
      onKeyDown={e => (e.key === 'Delete' ? deleteFigure() : null)}
      onMouseDown={handleMouseDown}
    ></div>
  );
};

export default Rectangle;

//LS - неподконтрольное нам хранилище, извлекая данные оттуда нужно предполагать, что там может быть всё что угодно.
//Сам пользователь вряд ли будет это намеренно делать. Но вот пользователь-хакер вполне. Или это может сделать установленное
//   пользователем расшерение, которое просто "меняет тему бразуреа", но на само деле, под капотом работает с LS.
//Мы предполагаем, что кладём туда {x: number, y: number}, но в результате махинаций под нашим ключём может оказаться
// просто строка, или совсем другой объект, или {x: number, y: {test: "тест"}}.
//Чтобы там ни оказалось, наше приложение не должно сломаться. Если данные не соответсвуют нашему предполагаемому типу
// нужно сбрасывать к дефолтным настройкам.

//Какие последствия могут быть? Очень разные. Например в кейсе с расширением, пользователь будет не понимать, почему
// при обновлении страницы у него картинка пропадает. Он будет звонить в тех.поддержку, та скорее всего не справиться
// и пойдёт к менеджерам, менеджер пойдёт к разработчикам "нужно срочно починить" - а у разработчиков новая фича итак горит
// доп. работы не надо.
//Пользователь может даже не звонить, а просто отказаться от продукта и выбрать продукт конкруентов со словами "у них не работает"
// не советую.
// И ещё куча разных исходов. У нас, благо, рисовашка, а представь, если бы это была финансовая система? Или логистика?
// Можно было бы попасть на миллионы=)

//Итого, задача следующая везде, где есть взаимодействие с LS нужно продумать грамотную проверку на точное соответствие значиния
// ожидаемому типу.


//----

//У тебя сейчас как будто 2 основные ветки (master и main). После правок, смерж всё в одну из них, а другую удали.