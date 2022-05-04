FROM continuumio/miniconda3:4.11.0

WORKDIR /code

COPY ./environment.yml /code/environment.yml

RUN conda env create -f /code/environment.yml

RUN echo "source activate services" > ~/.bashrc
ENV PATH /opt/conda/envs/services/bin:$PATH

COPY ./app /code/app

CMD ["uvicorn", "app.main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "80"]
