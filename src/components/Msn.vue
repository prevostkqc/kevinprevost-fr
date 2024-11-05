<template>
    <!-- Clipy -->
        <article class="kp_clipy">
            <img class="kp_clipy--img" src="/images/clipy.gif" alt="Clipy">
        </article>
    <!-- Clipy -->
</template>

<script>
import OpenAI from "openai";

export default {
    name: 'UneVue',
    data() {
        return {
            aiResponse: ''
        };
    },
    methods: {
        async fetchAIResponse() {
            try {
                const openai = new OpenAI({
                    apiKey: 'YOUR_API_KEY', // Remplacez par votre clé API (à sécuriser côté serveur)
                });

                const completion = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo", // Ou un autre modèle disponible
                    messages: [
                        { role: "system", content: "You are a helpful assistant." },
                        { role: "user", content: "Write a haiku about recursion in programming." },
                    ],
                });

                this.aiResponse = completion.choices[0].message.content;
            } catch (error) {
                console.error("Error fetching AI response:", error);
            }
        }
    },
    mounted() {
        this.fetchAIResponse();
    },
};
</script>

<style scoped>    
    @media screen and (max-width: 900px){
    }
</style>