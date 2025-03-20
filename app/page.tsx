"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

const API_ENDPOINT = "http://api-app.us-east-1.elasticbeanstalk.com/chat";

export default function ChatApp() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Mensagens renderizadas:", messages);
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(API_ENDPOINT, { message: input });
      console.log("Resposta da API:", response.data);
    
      const botMessage = response.data.response || "Erro ao obter resposta";
      
      setMessages((prev) => {
        const updatedMessages = [...prev, { sender: "bot", text: botMessage }];
        console.log("Mensagens atualizadas:", updatedMessages);
        return updatedMessages;
      });
    } catch (error) {
      console.error("Erro ao chamar API:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "Erro ao conectar com o servidor." }]);
    }
    
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen w-full max-w-6xl mx-auto bg-gray-900 shadow-lg rounded-lg overflow-hidden">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-800 text-white p-4 flex flex-col">
        <h2 className="text-lg font-bold pb-4">Memory Ai</h2>
      </aside>

      {/* Chat Window */}
      <main className="flex-1 flex flex-col bg-gray-950 p-4 max-h-[80vh] overflow-y-auto">
        <div className="flex flex-col space-y-4 p-2 md:p-6">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`max-w-[75%] px-4 py-2 rounded-lg text-white ${
    msg.sender === "user" ? "bg-blue-600 ml-auto text-right" : "bg-gray-700 mr-auto text-left"
  } shadow-md`}
            >
              {msg.text}
            </div>
          ))}
          {loading && <Skeleton className="w-32 h-6 bg-gray-500 rounded-lg" />}
        </div>
      </main>

      {/* Input de Mensagem */}
      <div className="p-4 bg-gray-800 border-t border-gray-700 flex items-center gap-2 w-full fixed bottom-0 left-0">
        <div className="flex w-full max-w-4xl mx-auto bg-gray-800 p-2 rounded-lg items-center gap-2">
          <Input 
            type="text" 
            placeholder="Digite uma mensagem..." 
            className="flex-1 px-4 py-2 border rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-md">Enviar</Button>
        </div>
      </div>
    </div>
  );
}
