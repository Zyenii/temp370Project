from llama_index.llms import LlamaCPP
from llama_index.llms.base import ChatMessage
from itertools import cycle
from gpt4all import GPT4All
from llama_index import Document, SummaryIndex
from llama_index.node_parser import SimpleNodeParser
from llama_index.query_engine import RetrieverQueryEngine

from temp370Project.Backend.api.returnSentences import pdf_to_string, sentences_around_index


def llama():
    llm = LlamaCPP()
    response = llm.complete("what is java")
    print(response.text)

#wizardlm-13b-v1.1-superhot-8k.ggmlv3.q4_0.bin
"""class gpt():

    role = ""
    narrative=""
    content = ""
    def __init__(self):
        llm = GPT4All(model_name= "llama-2-7b-chat.ggmlv3.q4_0.bin")
        llm.chat_session()"""

class QnA():
    def __init__(self, paragraphs, question):
        for t in paragraphs:
            if not isinstance(t, str):
                print(f"Unexpected type {type(t)} for value {t}")
        self.documents = [Document(text=t) for t in paragraphs]
        parser = SimpleNodeParser.from_defaults()
        self.nodes = parser.get_nodes_from_documents(self.documents)
        self.q = question

    def complete(self):
        index = SummaryIndex.from_documents(self.documents)
        retriever = index.as_retriever()
        query_engine = RetrieverQueryEngine.from_args(retriever)
        response = query_engine.query(self.q)
        return response

if __name__ == "__main__":
    #llama()
    bookname = "b.pdf"
    word = "director"
    bk = pdf_to_string(bookname)
    context = sentences_around_index(bk, word, 2)
    a = []
    for i in context:
        temp = ""
        for j in context[i]:
            temp = temp + j
        a.append(temp)

    h = QnA(a, "what does the director do")
    response = h.complete()
    print(response)
