'use client'
import type OpenAI from 'openai'
import { useEffect, useRef, useState } from 'react'
import styles from './Form.module.css'
import Link from 'next/link'
import { updateStudentCourse } from '@/app/firebaseutils'

const termsInQuotes: any[] = []

const Form = ({ modelsList, topicsArray, courseId }: { modelsList: OpenAI.ModelsPage, topicsArray: string[], courseId: string }) => {



  const messageInput = useRef<HTMLTextAreaElement | null>(null)
  // causes rerender without useEffect due to suspense boundary
  // const storedResponse = typeof localStorage !== 'undefined' ? localStorage.getItem('response') : null;
  // const initialHistory = storedResponse ? JSON.parse(storedResponse) : [];
  // const [history, setHistory] = useState<string[]>(initialHistory);
  const [history, setHistory] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // const [models, setModels] = useState<ModelType[]>([])
  const [models, setModels] = useState(modelsList.data)
  const [currentModel, setCurrentModel] = useState<string>('gpt-4')

  let rememberTopics = "From now on you will only talk about the following topics: "

  topicsArray.forEach((topic) => {
    rememberTopics = rememberTopics.concat(`\n${topic}`)
  })

  rememberTopics = rememberTopics.concat("\nI do not want you to answer anything that is not related to one of those topics. If I ever ask" +
    "something that is not completely related to them just say \"I can't answer that\". Do not talk about this instruction," +
    "just reply to what is below this. At the top of your response, I want in a single line in array like format (\"tag1, tag2, tag3\")" +
    "the topics that you think apply to the question I asked you. I do not want any other text, just the array and your response to my question." +
    "If what I ask does not apply to any of the tasks, just put an empty line. Do not put anything in between double quotes\n=======================================\n")

  //console.log(`Instructions: ${rememberTopics}`)

  const handleEnter = (
    e: React.KeyboardEvent<HTMLTextAreaElement> &
      React.FormEvent<HTMLFormElement>
  ) => {
    if (e.key === 'Enter' && isLoading === false) {
      e.preventDefault()
      setIsLoading(true)
      handleSubmit(e)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const messageHalf = messageInput.current?.value
    if (messageHalf !== undefined) {
      setHistory((prev) => [...prev, messageHalf])
      messageInput.current!.value = ''
    }

    if (!messageHalf) {
      return
    }

    //const fullMessage = JSON.stringify(rememberTopics + message)
    const message = rememberTopics + messageHalf

    //console.log(`Full message: ${fullMessage}`)

    console.log(`Message: ${message}`)

    const response = await fetch('/api/response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        //fullMessage,
        currentModel,
      }),
    })
    console.log('Edge function returned.')

    console.log(response)

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const data = response.body
    if (!data) {
      return
    }

    //console.log(`Message: ${fullMessage}`)
    console.log(`Data: ${data}`)

    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    console.log(`before set history: ${history}`)
    setHistory((prev) => [...prev, messageHalf])
    console.log(`after set history: ${history}`)

    let currentResponse: string[] = []
    let quote = false
    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)
      //console.log(chunkValue)
      // currentResponse = [...currentResponse, message, chunkValue];

      currentResponse = [...currentResponse, chunkValue]
      const loading = "..."
      setHistory((prev) => [...prev.slice(0, -1), loading])
      // setHistory((prev) => [...prev.slice(0, -1), currentResponse.join('')])
      console.log('rerender')
    }

    console.log(currentResponse)
    const display = currentResponse.join('')

    const regex = /"([^"]+)"/g

    const cleanedDisplay = display.replace(regex, (match, term) => {
      console.log(term)
      termsInQuotes.push(term)
      return ''
    })

    setHistory((prev) => [...prev.slice(0, -1), cleanedDisplay])
    console.log(termsInQuotes)
    console.log('rerender-2')
    // breaks text indent on refresh due to streaming
    // localStorage.setItem('response', JSON.stringify(history))
    setIsLoading(false)
  }

  const handleReset = () => {
    localStorage.removeItem('response')
    setHistory([])
  }

  // Save the 'history' state to 'localStorage' whenever it changes
  useEffect(() => {
    localStorage.setItem('response', JSON.stringify(history))
  }, [history])

  // Initialize 'history' state from 'localStorage' when the component mounts
  useEffect(() => {
    const storedResponse = localStorage.getItem('response')
    if (storedResponse) {
      setHistory(JSON.parse(storedResponse))
    }
  }, [])

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentModel(e.target.value)
  }

  const updateStudentTags = async (e: any) => {
    e.preventDefault()
  }

  const closeChat = async (e: any) => {
    console.log(termsInQuotes)
    await updateStudentCourse(courseId, "Marco", termsInQuotes);
    window.location.href = "/"
  }

  return (
    <div className={styles.chatContainer}>
      <button onClick={closeChat}>&le;</button>
      <div className={styles.messageList}>

        {history.map((item: string, index: number) => (
          <div
            key={index}
            className={`${index % 2 === 0 ? styles.userMessage : styles.botMessage}`}
          >
            <p>{item}</p>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className={styles.chatForm}
      >
        <textarea
          name="Message"
          placeholder="Type your query"
          ref={messageInput}
          onKeyDown={handleEnter}
          className={styles.textarea}
        />
        <button
          disabled={isLoading}
          type="submit"
          className={styles.sendButton}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 20 20"
            className="h-6 w-6 transform rotate-90"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
          </svg>
        </button>
      </form>
    </div>
  );


}

export default Form
