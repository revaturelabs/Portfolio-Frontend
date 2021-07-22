import { render } from "@testing-library/react";
import styleInvalidElements from "../components/validation/InvalidFormHandling";

test('ensure all empty elements are styled', () => {
    let e1 = document.createElement('input');
    e1.setAttribute('className', 'test');
    e1.setAttribute('id', 'e1');
    document.body.appendChild(e1);

    let e2 = document.createElement('input');
    e2.setAttribute('className', 'test');
    e2.setAttribute('id', 'e2');
    document.body.appendChild(e2);

    let e3 = document.createElement('input');
    e3.setAttribute('className', 'test');
    e3.setAttribute('id', 'e3');
    document.body.appendChild(e3);

    

    styleInvalidElements(document.getElementsByClassName('test'));
    expect(document.getElementById('e1')).toHaveStyle("border-left: 3px solid red");
    expect(document.getElementById('e2')).toHaveStyle("border-left: 3px solid red");
    expect(document.getElementById('e3')).toHaveStyle("border-left: 3px solid red");
});

test('ensure only empty elements are styled', () => {
    let e1 = document.createElement('input');
    e1.setAttribute('className', 'test');
    e1.setAttribute('value', 'test');
    e1.setAttribute('id', 'e1');
    document.body.appendChild(e1);
    console.log(e1.getAttribute('value'))
    console.log(document.getElementById('e1')?.getAttribute('value'));

    let e2 = document.createElement('input');
    e2.setAttribute('className', 'test');
    e2.setAttribute('id', 'e2');
    document.body.appendChild(e2);

    let e3 = document.createElement('input');
    e3.setAttribute('className', 'test');
    e3.setAttribute('id', 'e3');
    document.body.appendChild(e3);

    styleInvalidElements(document.getElementsByClassName('test'));
    expect(document.getElementById('e1')).toHaveStyle("border-left: 1px solid black");
    expect(document.getElementById('e2')).toHaveStyle("border-left: 3px solid red");
    expect(document.getElementById('e3')).toHaveStyle("border-left: 3px solid red");
});

test('ensure valid elements are not styled', () => {
    let e1 = document.createElement('input');
    e1.setAttribute('className', 'test');
    e1.setAttribute('value', 'test');
    e1.setAttribute('id', 'e1');
    document.body.appendChild(e1);

    let e2 = document.createElement('input');
    e2.setAttribute('className', 'test');
    e2.setAttribute('value', 'test');
    e2.setAttribute('id', 'e2');
    document.body.appendChild(e2);

    let e3 = document.createElement('input');
    e3.setAttribute('className', 'test');
    e3.setAttribute('value', 'test');
    e3.setAttribute('id', 'e3');
    document.body.appendChild(e3);

    

    styleInvalidElements(document.getElementsByClassName('test'));
    expect(document.getElementById('e1')).toHaveStyle("border-left: 1px solid black");
    expect(document.getElementById('e2')).toHaveStyle("border-left: 1px solid black");
    expect(document.getElementById('e3')).toHaveStyle("border-left: 1px solid black");
});

test('ensure all empty elements have ! placeholder', () => {
    let e1 = document.createElement('input');
    e1.setAttribute('className', 'test');
    e1.setAttribute('id', 'e1');
    document.body.appendChild(e1);

    let e2 = document.createElement('input');
    e2.setAttribute('className', 'test');
    e2.setAttribute('id', 'e2');
    document.body.appendChild(e2);

    let e3 = document.createElement('input');
    e3.setAttribute('className', 'test');
    e3.setAttribute('id', 'e3');
    document.body.appendChild(e3);

    styleInvalidElements(document.getElementsByClassName('test'));
    expect(document.getElementById("e1")?.getAttribute('placeholder')).toBe('!');
    expect(document.getElementById("e2")?.getAttribute('placeholder')).toBe('!');
    expect(document.getElementById("e3")?.getAttribute('placeholder')).toBe('!');
});

test('ensure only invalid elements have ! placeholder', () => {
    //const testDoc = new Document;
    let e1 = document.createElement('h1');
    e1.setAttribute('className', 'test');
    e1.setAttribute('id', 'e1');
    e1.setAttribute('value', 'test')
    document.body.appendChild(e1);

    let e2 = document.createElement('h1');
    e2.setAttribute('className', 'test');
    e2.setAttribute('id', 'e2');
    document.body.appendChild(e2);

    let e3 = document.createElement('h1');
    e3.setAttribute('className', 'test');
    e3.setAttribute('id', 'e3');
    document.body.appendChild(e3);

    styleInvalidElements(document.getElementsByClassName('test'));
    expect(document.getElementById('e1')?.getAttribute('placeholder')).toBe(null);
    expect(document.getElementById('e2')?.getAttribute('placeholder')).toBe('!');
    expect(document.getElementById('e3')?.getAttribute('placeholder')).toBe('!');
});
