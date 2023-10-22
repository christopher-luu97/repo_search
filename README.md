# Repo Search with Natural Language QnA

## Description

This application is designed for in-depth, natural language searches within Python repositories, coupled with a sophisticated QnA feature to explore and understand the codebase effectively. It's built with privacy and security at its core, ensuring all searches and interactions occur offline, keeping your codebase and queries confidential.

## Demonstration Video:
[Coming Soon!]

## Purpose

Inspired by the need for an efficient, secure, and offline tool to explore and interrogate codebases using natural language queries. Whether it's understanding a function's purpose or tracing class references, this tool is geared towards individuals and organizations highly protective of their IP and seeking offline solutions.

## Features

- **Offline Capability:** Operate entirely offline, ensuring no data leaks or internet dependency.
- **Natural Language Search:** Powered by [Marqo](https://www.marqo.ai), an open-source tensor-based search and analytics engine, enabling intuitive codebase queries.
- **Large Language Model Integration:** Utilize powerful models like WizardLM-7B for insightful, context-aware responses. [View Model](https://huggingface.co/TheBloke/WizardLM-7B-uncensored-GGML)
- **Interactive UI:** Built with React and TypeScript, offering a user-friendly interface for seamless interactions.
- **Styled with TailwindCSS:** Aesthetic, responsive design ensuring a pleasant user experience.

## System Architecture

The application is structured to work offline, leveraging a proxy network server housed on a separate machine, ensuring all data and interactions remain internal and secure. All services, including the model API, are exposed via this internal server, accessible over Wifi for users aware of the machine's IP address.

## Getting Started

Navigate to /Frontend and /Backend and follow the steps in the README found in those folders respectively. This project requires users that wish to run this themselves to configure the application and build the dockerfiles themselves along with all the indexing as well.

## Key Links
These links specify key technologies used and point the reader towards further exploration if they wish to.

* Marqo Search Engine: [Website](https://www.marqo.ai) and [Github](https://github.com/marqo-ai/marqo)
* KoboldCPP: [Github](https://github.com/LostRuins/koboldcpp) and [API](https://petstore.swagger.io/?url=https://lite.koboldai.net/kobold_api.json) and [FAQ](https://github.com/LostRuins/koboldcpp/wiki)
* Various Language Model Links from TheBloke on Huggingface for LLMs: [TheBloke](https://huggingface.co/TheBloke)
