FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    texlive-latex-base \
    texlive-latex-extra \
    texlive-fonts-recommended \
    texlive-fonts-extra \
    texlive-xetex \
    latexmk \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY public/documents src/assets .

CMD /bin/bash -c "\
    for tex_file in src/assets/*.tex; do \
        latexmk -pdf -interaction=nonstopmode -outdir=public/documents \$tex_file && \
        latexmk -c -outdir=public/documents \$tex_file; \
    done"