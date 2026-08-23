import google.generativeai as genai

genai.configure(api_key='AIzaSyA80VeXWj02AWDTGHAHO8HKjn-6VB7jokI')
for m in genai.list_models():
    print(m.name, m.supported_generation_methods)