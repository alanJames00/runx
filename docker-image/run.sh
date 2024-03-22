# write a function to compile using switch case

# $1 = language
# $2 = file
# error code 40 = Compile Error
# error code 50 = Runtime Error



function compile() {

    case $1 in
        "c")
            gcc $2
            
            if [ $? -eq 0 ]; then
                
                run $1
            else
                
                echo "Error: Compile Error"
                echo "40"
            fi
            ;;
        "cpp")
           g++ $2
            
            if [ $? -eq 0 ]; then
                
                run $1
            else
                
                echo "Error: Compile Error"
                echo "40"
            fi
            ;;
        "java")
            javac $2
            run $1
            ;;
        "py3")
            run $1 $2
            if [ $? -eq 0 ]; then

                return 0
            else
                
                echo "Error: Runtime Error"
                echo "50"
            fi
            ;;
        "node")
            run $1 $2
            if [ $? -eq 0 ]; then
                
                return 0
            else
               
                echo "Error: Runtime Error"
                echo "50"
            fi
            ;;
        *)
            echo "Invalid language"
            ;;
    esac
}

function run() {
    
    case $1 in
        "c")
            ./a.out
            if [ $? -eq 0 ]; then
                
                return 0
            else
                
                echo "Error: Runtime Error"
                echo "50"
            fi
            ;;
        "cpp")
            ./a.out
            if [ $? -eq 0 ]; then
                
                return 0
            else
                
                echo "Error: Runtime Error"
                echo "50"
            fi
            ;;

        "java")
            java Main
            ;;
        "py3")
        
            python3 $2
            ;;
        "node")
            
            node $2

            ;;
        *)
            echo "Invalid language"
            ;;
    esac
}

compile $1 $2