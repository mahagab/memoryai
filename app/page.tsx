"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

const API_ENDPOINT = "https://cors-anywhere.herokuapp.com/http://api-app.us-east-1.elasticbeanstalk.com/chat";

export default function ChatApp() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Adiciona mensagem do usuário na tela
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(API_ENDPOINT, { message: input });
      const botMessage = response.data.reply || "Erro ao obter resposta";

      setMessages((prev) => [...prev, { sender: "bot", text: botMessage }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Erro ao conectar com o servidor." }]);
    }

    setLoading(false);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-900 text-white p-4 flex flex-col">
        <h2 className="text-lg font-bold">Conversas</h2>
      </aside>

      {/* Chat Window */}
      <main className="flex-1 flex flex-col bg-gray-100 p-4">
        <div className="flex-1 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`max-w-[75%] p-3 rounded-lg text-white ${msg.sender === "user" ? "bg-blue-500 self-end text-right" : "bg-gray-300 text-black self-start text-left"}`}
            >
              {msg.text}
            </div>
          ))}
          {loading && <Skeleton className="w-32 h-6 bg-gray-300 rounded-lg" />}
        </div>

        {/* Input de Mensagem */}
        <div className="p-4 bg-white border-t flex items-center gap-2">
          <Input 
            type="text" 
            placeholder="Digite uma mensagem..." 
            className="flex-1" 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={sendMessage}>Enviar</Button>
        </div>
      </main>
    </div>
  );
}
