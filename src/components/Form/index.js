import React from 'react'

export const Form = ({
    text,
    choices,
    answer,
    onSubmit,
    onChangeText,
    onChangeChoice,
    onChangeAnswer
 }) => (
  <form onSubmit={onSubmit}>
    <textarea
      onChange={onChangeText}
      value={text}
      style={{
        width: '100%',
        height: '30vh',
        resize: 'none',
      }}
    />
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
    {
      Object.entries(choices).sort((a, b) => a[0] > b[0]).map(([idx, choice]) => (
        <div key={idx}>
          {idx}:<input type="text" value={choice} onChange={(e) => onChangeChoice(idx, e)} />
        </div>
      ))
    }
    </div>
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <input type="number" value={answer} min="1" max="4" onChange={onChangeAnswer} />
    </div>
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <input type="submit" />
    </div>
  </form>
)

