
import { AngularIcon, AnsibleIcon, BookIcon, BootstrapIcon, CPPIcon, CSSIcon, CSharpIcon, DartIcon, DjangoIcon, DockerIcon, ExpressIcon, FlaskIcon, GoIcon, HTMLIcon, JSIcon, JavaIcon, KotlinIcon, KubernetesIcon, LaravelIcon, LuaIcon, NetIcon, NextIcon, NextJSIcon, NodeIcon, NuxtIcon, PHPIcon, PerlIcon, PythonIcon, RIcon, ReactIcon, RubyIcon, RubyOnRailsIcon, RustIcon, SQLIcon, ScalaIcon, SpringIcon, SwiftIcon, TSIcon, TailwindIcon, TerraformIcon, VueIcon } from "@/app/components/Icons"
import { IItemCategory } from "../(pages)/playground/algorithms/components/Playground/Playground"



export const CATEGORIES =
// Lenguajes de Programación
{
    types: {
        items: [
            {
                option: "languages",
                value: "Lenguajes",
                functionSyntax: `<!--does not support functions -->`,
                color: "#E34F26",
                logo: <NextIcon />
            },
            {
                option: "frontend",
                value: "Front-End",
                functionSyntax: `<!--does not support functions -->`,
                color: "#E34F26",
                logo: <NextIcon />
            },
            {
                option: "backend",
                value: "Back-End",
                functionSyntax: `<!--does not support functions -->`,
                color: "#E34F26",
                logo: <NextIcon />
            },
            {
                option: "devops",
                value: "DevOps",
                functionSyntax: `<!--does not support functions -->`,
                color: "#E34F26",
                logo: <NextIcon />
            }
        ]
    },
    languages: {
        items: [
            {
                option: "javascript",
                value: "JavaScript",
                functionSyntax: `function myFunction() {\n\treturn false;\n}`,
                color: "#F7DF1E",
                logo: <JSIcon />
            },
            {
                option: "python",
                value: "Python",
                functionSyntax: `def myFunction():\n\treturn False`,
                color: "#3776AB",
                logo: <PythonIcon />
            },
            {
                option: "java",
                value: "Java",
                functionSyntax: `public class Main {\n\tpublic static boolean myFunction() {\n\t\treturn false;\n\t}\n}`,
                color: "#007396",
                logo: <JavaIcon />
            },
            {
                option: "cpp",
                value: "C++",
                functionSyntax: `namespace MyNamespace {\n\tbool myFunction() {\n\t\treturn false;\n\t}\n}`,
                color: "#00599C",
                logo: <CPPIcon />
            },
            {
                option: "csharp",
                value: "C#",
                functionSyntax: `namespace MyNamespace {\n\tclass Program {\n\t\tpublic bool myFunction() {\n\t\t\treturn false;\n\t\t}\n\t}\n}`,
                color: "#239120",
                logo: <CSharpIcon />
            },
            {
                option: "ruby",
                value: "Ruby",
                functionSyntax: `module MyModule\n\tdef myFunction\n\t\tfalse\n\tend\nend`,
                color: "#CC342D",
                logo: <RubyIcon />
            },
            {
                option: "php",
                value: "PHP",
                functionSyntax: `<?php\nfunction myFunction() {\n\treturn false;\n}`,
                color: "#777BB4",
                logo: <PHPIcon />
            },
            {
                option: "typescript",
                value: "TypeScript",
                functionSyntax: `function myFunction(): boolean {\n\treturn false;\n}`,
                color: "#3178C6",
                logo: <TSIcon />
            },
            {
                option: "swift",
                value: "Swift",
                functionSyntax: `class MyClass {\n\tfunc myFunction() -> Bool {\n\t\treturn false\n\t}\n}`,
                color: "#FA7343",
                logo: <SwiftIcon />
            },
            {
                option: "kotlin",
                value: "Kotlin",
                functionSyntax: `class MyClass {\n\tfun myFunction(): Boolean {\n\t\treturn false\n\t}\n}`,
                color: "#0095D5",
                logo: <KotlinIcon />
            },
            {
                option: "go",
                value: "Go",
                functionSyntax: `package main\n\nfunc myFunction() bool {\n\treturn false\n}`,
                color: "#00ADD8",
                logo: <GoIcon />
            },
            {
                option: "rs",
                value: "Rust",
                functionSyntax: `mod my_module {\n\tpub fn myFunction() -> bool {\n\t\tfalse\n\t}\n}`,
                color: "#DEA584",
                logo: <RustIcon />
            },
            {
                option: "dart",
                value: "Dart",
                functionSyntax: `class MyClass {\n\tbool myFunction() {\n\t\treturn false;\n\t}\n}`,
                color: "#0175C2",
                logo: <DartIcon />
            },
            {
                option: "scala",
                value: "Scala",
                functionSyntax: `object MyObject {\n\tdef myFunction(): Boolean = {\n\t\tfalse\n\t}\n}`,
                color: "#DC322F",
                logo: <ScalaIcon />
            },
            {
                option: "r",
                value: "R",
                functionSyntax: `myFunction <- function() {\n\treturn(FALSE)\n}`,
                color: "#276DC3",
                logo: <RIcon />
            },
            {
                option: "perl",
                value: "Perl",
                functionSyntax: `package MyPackage;\n\nsub myFunction {\n\treturn 0;\n}`,
                color: "#39457E",
                logo: <PerlIcon />
            },
            {
                option: "lua",
                value: "Lua",
                functionSyntax: `function myFunction()\n\treturn false\nend`,
                color: "#3737f9",
                logo: <LuaIcon />
            },
            {
                option: "sql",
                value: "SQL",
                functionSyntax: `-- SQL does not support functions in the same way\n-- Example for a stored procedure\nCREATE PROCEDURE myFunction()\nAS\nBEGIN\n\tSELECT 0 AS Result;\nEND`,
                color: "#E38C00",
                logo: <SQLIcon />
            }
        ]
    },
    // Front-End
    frontend: {
        items: [
            {
                option: "html",
                value: "HTML",
                functionSyntax: `<!-- HTML does not support functions -->`,
                color: "#E34F26",
                logo: <HTMLIcon />
            },
            {
                option: "css",
                value: "CSS",
                functionSyntax: `/* CSS does not support functions */`,
                color: "#1572B6",
                logo: <CSSIcon />
            },
            {
                option: "reactjs",
                value: "React",
                functionSyntax: `function myFunction() {\n\treturn false;\n}`,
                color: "#61DAFB",
                logo: <ReactIcon />
            },
            {
                option: "angular",
                value: "Angular",
                functionSyntax: `function myFunction() {\n\treturn false;\n}`,
                color: "#DD0031",
                logo: <AngularIcon />
            },
            {
                option: "vuejs",
                value: "Vue.js",
                functionSyntax: `function myFunction() {\n\treturn false;\n}`,
                color: "#4FC08D",
                logo: <VueIcon />
            },
            {
                option: "nextjs",
                value: "Next.js",
                functionSyntax: `function myFunction() {\n\treturn false;\n}`,
                color: "#f4f4f4",
                logo: <NextJSIcon />
            },
            {
                option: "nuxtjs",
                value: "Nuxt.js",
                functionSyntax: `function myFunction() {\n\treturn false;\n}`,
                color: "#00C58E",
                logo: <NuxtIcon />
            },
            {
                option: "bootstrap",
                value: "Bootstrap",
                functionSyntax: `/* Bootstrap does not support functions */`,
                color: "#7952B3",
                logo: <BootstrapIcon />
            },
            {
                option: "tailwindcss",
                value: "Tailwind CSS",
                functionSyntax: `/* Tailwind CSS does not support functions */`,
                color: "#38B2AC",
                logo: <TailwindIcon />
            },
            {
                option: "sass",
                value: "Sass",
                functionSyntax: `/* Sass does not support functions */`,
                color: "#CC6699",
                logo: <CSSIcon />
            }
        ]
    },
    // Back-End
    backend: {
        items: [
            {
                option: "nodejs",
                value: "Node.js",
                functionSyntax: `function myFunction() {\n\treturn false;\n}`,
                color: "#339933",
                logo: <NodeIcon />
            },
            {
                option: "django",
                value: "Django",
                functionSyntax: `def myFunction():\n\treturn False`,
                color: "#0c704a",
                logo: <DjangoIcon />
            },
            {
                option: "flask",
                value: "Flask",
                functionSyntax: `def myFunction():\n\treturn False`,
                color: "#000000",
                logo: <FlaskIcon />
            },
            {
                option: "spring",
                value: "Spring",
                functionSyntax: `public class Main {\n\tpublic static boolean myFunction() {\n\t\treturn false;\n\t}\n}`,
                color: "#6DB33F",
                logo: <SpringIcon />
            },
            {
                option: "rails",
                value: "Ruby on Rails",
                functionSyntax: `class ApplicationController < ActionController::Base\n\tdef myFunction\n\t\tfalse\n\tend\nend`,
                color: "#CC0000",
                logo: <RubyOnRailsIcon />
            },
            {
                option: "laravel",
                value: "Laravel",
                functionSyntax: `<?php\nfunction myFunction() {\n\treturn false;\n}`,
                color: "#FF2D20",
                logo: <LaravelIcon />
            },
            {
                option: "expressjs",
                value: "Express",
                functionSyntax: `function myFunction() {\n\treturn false;\n}`,
                color: "#b6b6b6",
                logo: <ExpressIcon />
            },
            {
                option: ".net",
                value: ".NET",
                functionSyntax: `namespace MyNamespace {\n\tclass Program {\n\t\tpublic bool myFunction() {\n\t\t\treturn false;\n\t\t}\n\t}\n}`,
                color: "#512BD4",
                logo: <NetIcon />
            }
        ]
    },
    // DevOps y Herramientas
    devops: {
        items: [
            {
                option: "docker",
                value: "Docker",
                functionSyntax: `/* Docker does not support functions */`,
                color: "#2496ED",
                logo: <DockerIcon />
            },
            {
                option: "kubernetes",
                value: "Kubernetes",
                functionSyntax: `/* Kubernetes does not support functions */`,
                color: "#326CE5",
                logo: <KubernetesIcon />
            },
            {
                option: "ansible",
                value: "Ansible",
                functionSyntax: `/* Ansible does not support functions */`,
                color: "#EE0000",
                logo: <AnsibleIcon />
            },
            {
                option: "terraform",
                value: "Terraform",
                functionSyntax: `/* Terraform does not support functions */`,
                color: "#623CE4",
                logo: <TerraformIcon />
            }
        ]
    },
    // Cloud
    cloud: {
        items: [
            {
                option: "aws",
                value: "AWS",
                functionSyntax: `/* AWS uses Lambda functions */\nexports.handler = async (event) => {\n\treturn false;\n};`,
                color: "#FF9900",
                logo: <TerraformIcon />
            },
            {
                option: "azure",
                value: "Azure",
                functionSyntax: `/* Azure uses Functions */\nmodule.exports = async function (context, req) {\n\tcontext.res = {\n\t\tbody: false\n\t};\n};`,
                color: "#0089D6",
                logo: <TerraformIcon />
            },
            {
                option: "gcp",
                value: "Google Cloud Platform",
                functionSyntax: `/* GCP uses Cloud Functions */\nexports.myFunction = (req, res) => {\n\tres.send(false);\n};`,
                color: "#4285F4",
                logo: <TerraformIcon />
            }
        ]
    },
    // Big Data
    bigdata: {
        items: [
            {
                option: "hadoop",
                value: "Hadoop",
                functionSyntax: `/* Hadoop does not support functions directly */`,
                color: "#66CCFF",
                logo: <TerraformIcon />
            },
            {
                option: "spark",
                value: "Apache Spark",
                functionSyntax: `/* Spark does not support functions directly */`,
                color: "#E25A1C",
                logo: <TerraformIcon />
            },
            {
                option: "kafka",
                value: "Apache Kafka",
                functionSyntax: `/* Kafka does not support functions directly */`,
                color: "#231F20",
                logo: <TerraformIcon />
            }
        ]
    },
    // Machine Learning y AI
    machine: {
        items: [
            {
                option: "tensorflow",
                value: "TensorFlow",
                functionSyntax: `/* TensorFlow does not support functions directly */`,
                color: "#FF6F00",
                logo: <TerraformIcon />
            },
            {
                option: "pytorch",
                value: "PyTorch",
                functionSyntax: `/* PyTorch does not support functions directly */`,
                color: "#EE4C2C",
                logo: <TerraformIcon />
            },
            {
                option: "ml",
                value: "Machine Learning",
                functionSyntax: `/* Machine Learning is a concept, not a language */`,
                color: "#F9A825",
                logo: <TerraformIcon />
            }
        ]
    },
    // Herramientas de Desarrollo
    tools: {
        items: [
            {
                option: "webpack",
                value: "Webpack",
                functionSyntax: `/* Webpack does not support functions */`,
                color: "#8DD6F9",
                logo: <TerraformIcon />
            },
            {
                option: "babel",
                value: "Babel",
                functionSyntax: `/* Babel does not support functions */`,
                color: "#F9DC3E",
                logo: <TerraformIcon />
            },
            {
                option: "graphql",
                value: "GraphQL",
                functionSyntax: `/* GraphQL does not support functions directly */`,
                color: "#E10098",
                logo: <TerraformIcon />
            }
        ]
    },
    // Mobile
    mobile: {
        items: [
            {
                option: "reactnative",
                value: "React Native",
                functionSyntax: `function myFunction() {\n\treturn false;\n}`,
                color: "#61DAFB",
                logo: <TerraformIcon />
            },
            {
                option: "flutter",
                value: "Flutter",
                functionSyntax: `class MyClass {\n\tbool myFunction() {\n\t\treturn false;\n\t}\n}`,
                color: "#02569B",
                logo: <TerraformIcon />
            },
            {
                option: "swift",
                value: "Swift",
                functionSyntax: `class MyClass {\n\tfunc myFunction() -> Bool {\n\t\treturn false\n\t}\n}`,
                color: "#FA7343",
                logo: <TerraformIcon />
            },
            {
                option: "kotlin",
                value: "Kotlin",
                functionSyntax: `class MyClass {\n\tfun myFunction(): Boolean {\n\t\treturn false\n\t}\n}`,
                color: "#0095D5",
                logo: <TerraformIcon />
            }
        ]
    }
}

export const DefaultLanguage: IItemCategory = {
    option: "javascript",
    value: "JavaScript",
    functionSyntax: `function myFunction() {\n\treturn false;\n}`,
    color: "#F7DF1E",
    logo: <JavaIcon />
}

export const DefaultCategory: IItemCategory = {
    option: "languages",
    value: "Lenguajes",
    functionSyntax: `null`,
    color: "#F7DF1E",
    logo: <BookIcon />
}