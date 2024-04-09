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
                
                run $1 $2 $3
            else
                
                echo "40"
                return 40
            fi
            ;;
        "cpp")
           g++ $2
            
            if [ $? -eq 0 ]; then
                
                run $1 $2 $3
            else
                
                echo "40"
                return 40
            fi
            ;;
        "java")
            javac $2
            run $1 
            ;;
        "py3")
            run $1 $2 $3
            if [ $? -eq 0 ]; then

                return 0
            else
                
                echo "50"
                return 50
            fi
            ;;
        "js")
            run $1 $2 $3
            if [ $? -eq 0 ]; then
                
                return 0
            else
               
                echo "50"
                return 50
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
            
            echo $3 | timeout --foreground 2s ./a.out
            timeout_exit_status=$?

            if [ $timeout_exit_status -eq 0 ]; then
                
                return 0

            elif [ $timeout_exit_status -eq 124 ]; then
            
            # timeout kill sigal

                echo "60"
                return 60
            else
                
                echo "50"
                return 50
            fi
            ;;
        "cpp")
            
            echo $3 | timeout --foreground 2s ./a.out
            timeout_exit_status=$?

            if [ $timeout_exit_status -eq 0 ]; then
                
                return 0
            elif [ $timeout_exit_status -eq 124 ]; then
            
            # timeout kill sigal

                echo "60"
                return 60
            else
                
                echo "50"
                return 50
            fi
            ;;

        "java")
            java Main
            ;;
        "py3")
        
            echo "$3" | timeout --foreground 2s python3 $2
            ;;
        "js")
            
            timeout --foreground 2s /root/.nvm/versions/node/v18.20.1/bin/node $2

            ;;
        *)
            echo "Invalid language"
            ;;
    esac
}

compile $1 $2 $3