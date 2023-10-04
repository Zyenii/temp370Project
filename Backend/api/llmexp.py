from gpt4all import GPT4All


def localcall(paragraphs, question):
    model = GPT4All('ggml-model-gpt4all-falcon-q4_0.bin')
    documents = paragraphs

    # Convert the list of strings into a system template
    system_template = 'A chat based on the following documents:\n'
    for i, doc in enumerate(documents, 1):
        system_template += f"Document {i}: {doc}\n"

    # The rest of the code remains the same
    prompt_template = 'USER: {0}\nASSISTANT: '

    with model.chat_session(system_template, prompt_template):
        response1 = model.generate(question)
        print(response1)